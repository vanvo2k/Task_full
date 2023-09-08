const User = require('../models/User')
const Bill = require('../models/Bill')
const Membership = require('../models/Membership')
const Plan = require('../models/Plan')
const {getEndDayTimeLater} = require("../helpers/time")
const RedemptionActions = require('./RedemptionActions')
const TapfiliateServices = require('../services/TapfiliateServices')
const LoggerServices = require("../services/LoggerServices")
const Moment = require('moment')
const {transporter, PREFIX} = require('../services/TransportServices')
const {USER_CHANGE_MEMBERSHIP, BILL_COMPLETED} = require('spyamz-constants').events

const _getTimeFinishPaidMembership = (userId) => {
    return User
        .findOne({
            _id: userId,
        })
        .populate('membership', Membership)
        .then(user => {
            if (!user) {
                throw new Error('User not found.')
            }

            return Promise.resolve(user)
        })
        .then(user => {
            const membership = user.get('membership')

            if (!membership || !Object.keys(membership).length) {
                throw new Error('User have not any membership.')
            }

            return Promise.resolve(membership)
        })
        .then(membership => {
            const planId = membership.plan

            return Plan.findById(planId)
                .then(plan => {
                    if (!plan) {
                        throw new Error('Plan not found.')
                    }

                    return Promise.resolve(plan)
                })
                .then(plan => {
                    const price = plan.get('price')

                    if (!price || price <= 0) {
                        throw new Error('Plan is not paid plan.')
                    }

                    return Promise.resolve(plan)
                })
                .then(() => {
                    const finishTime = membership.finish
                    const finishMoment = Moment(finishTime)

                    if (finishMoment.isBefore(Moment())) {
                        throw new Error('Membership expired.')
                    }

                    return Promise.resolve(finishTime)
                })
        })
        .catch(error => {
            console.log(error)

            return Promise.resolve(Date.now())
        })
}

exports.updateBill = ({billId, meta = {}, method = 'direct'}) => {
    return Bill.findById(billId).then(bill => {
        if (!bill) {
            throw new Error(`Bill not found. Bill ID: ${billId}`)
        }

        const currentMeta = bill.get('extend')
        const computedMeta = Object.assign({}, currentMeta, meta)

        return bill.update({
            $set: {
                extend: computedMeta,
                updated: Date.now(),
                method
            }
        }).then(() => Bill.findById(billId))
    })
}

exports.createBill = ({userId, planId, coupon = '', meta = {}, status = 'pending', method = 'direct'}) => {
    return Promise
        .all([
            _getDiscountOrder({userId, planId, coupon}),
            Plan.findById(planId)
        ])
        .then(([order, plan]) => {
            if (!plan) {
                throw  new Error(`Plan not found. Plan ID: ${planId}`)
            }

            return Promise.resolve([order, plan])
        })
        .then(async ([order, plan]) => {
            const title = plan.get('title')
            const currency = plan.get('currency')

            const {discount, total} = order

            // find user affiliate with this user
            const user = await User.findById(userId).select('affiliateRefCode').lean()

            let affiliateRefCode = null
            if (user && user.affiliateRefCode && plan.price > 0) {
                // check user already have bill with price greater than 0
                const beforeBill = await Bill.findOne({owner: userId, status: 'completed', price: {$gt: 0}}).lean()
                if (!beforeBill) {
                    affiliateRefCode = user.affiliateRefCode
                }
            }

            // if exists update user affiliate to bill
            const data = {
                title: `[SpyAMZ] ${title}`,
                owner: userId,
                plan: planId,
                coupon,
                price: (total - discount).toFixed(2),
                total: total.toFixed(2),
                currency,
                status,
                method,
                extend: meta,
            }
            if (affiliateRefCode) {
                data.affiliate = affiliateRefCode
            }
            const bill = new Bill(data)

            return bill.save()
                .then(bill => {
                    const billId = bill.get('_id')

                    if (discount > 0 && coupon) {
                        RedemptionActions.addRedemption({userId, planId, billId, code: coupon, total, discount})
                    }

                    return Promise.resolve(bill)
                })
        })
}

exports.completeBill = (billId) => {
    return Bill
        .findById(billId)
        .then(bill => {
            if (!bill) {
                throw new Error(`Bill not found. BillID: ${billId}`)
            }

            const status = bill.get('status')
            if (status === 'completed') {
                throw new Error(`Bill was paid. BillID: ${billId}`)
            }

            return Promise.resolve(bill)
        })
        .then(bill => {
            return bill.update(
                {
                    $set: {
                        status: 'completed',
                        updated: Date.now()
                    }
                }
            )
        })
        .then(() => Bill.findById(billId))
        .then(bill => {
            const couponCode = bill.get('coupon')

            if (!couponCode) {
                return Promise.resolve(bill)
            }

            return RedemptionActions.completedRedemption({billId, couponCode})
                .then(() => Promise.resolve(bill))
        })
        .then(bill => {
            transporter.publish(`${PREFIX}.${BILL_COMPLETED}`, bill._id)

            return Promise.resolve(bill)
        })
}

exports.createMembership = ({userId, billId, canCancel = false}) => {
    return Bill.findById(billId).then(bill => {
        if (!bill) {
            throw new Error(`Bill not found. Bill ID: ${billId}`)
        }

        const status = bill.get('status')

        if (status !== 'completed') {
            throw new Error(`This bill has not been paid. Status: ${status}`)
        }

        return Promise.resolve(bill)
    }).then(bill => {
        const planId = bill.get('plan')

        return Plan.findById(planId)
            .then(plan => {
                if (!plan) {
                    throw new Error(`Plan not found. Plan ID: ${planId}`)
                }

                return Promise.resolve(plan)
            })
    }).then((plan) => {
        const planId = plan.get('_id')
        const durationAmount = plan.get('durationAmount')
        const durationUnit = plan.get('durationUnit') || 'month'
        const durationAmountValidated = durationAmount > 0 ? parseInt(durationAmount, 10) : 1
        const finishTime = getEndDayTimeLater(durationAmountValidated, durationUnit, Date.now())

        const newMembership = new Membership({
            owner: userId,
            plan: planId,
            bill: billId,
            start: Date.now(),
            finish: finishTime,
            canCancel
        })

        return newMembership.save()
    }).then(membership => {
        return User.findById(userId).then(user => {
            if (!user) {
                throw new Error(`User not found. ID: ${userId}`)
            }

            return Promise.resolve(user)
        }).then(user => {
            return user.update({
                $set: {
                    membership: membership.get('_id'),
                    updated: Date.now()
                }
            })
        }).then(updated => {
            const membershipId = membership.get('_id')

            return Membership.findOne({
                _id: membershipId
            }).populate('owner').populate('plan')
        }).then(result => {
            transporter.publish(`${PREFIX}.${USER_CHANGE_MEMBERSHIP}`, userId)

            return Promise.resolve(result)
        })
    })
}

const _getDiscountOrder = ({userId, planId, coupon = ''}) => {
    return Promise.all([
        User.findById(userId),
        Plan.findById(planId)
    ]).then(([user, plan]) => {
        if (!user) {
            throw new Error(`User not found. UserID: ${userId}`)
        }

        if (!plan) {
            throw new Error(`Plan not found. PlanID: ${planId}`)
        }

        return Promise.resolve([user, plan])
    }).then(([user, plan]) => {
        const price = plan.get('price')

        if (!coupon) {
            return Promise.resolve([price, 0])
        }

        return RedemptionActions.getDiscount({total: price, code: coupon, userId, bothPrivate: true})
            .then(discount => {
                if (discount > price) {
                    return Promise.resolve([0, discount])
                }

                return Promise.resolve([price, discount])
            })
            .catch((error) => {

                return Promise.resolve([price, 0])
            })
    }).then(([total, discount]) => {
        return Promise.resolve({
            total,
            discount
        })
    })
}
