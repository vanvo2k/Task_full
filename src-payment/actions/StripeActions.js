const StripeServices = require('../services/StripeServices')
const User = require('../models/User')
const Plan = require('../models/Plan')
const StripeUser = require('../models/StripeUser')
const CheckoutActions = require('./CheckoutActions')
const RecurringActions = require('./RecurringActions')
const Broadcaster = require('tamz-broadcaster')
const {NEW_SUBSCRIPTION_AUTO} = require('../constants/Events')


/**
 * Create a new Stripe user and save to database.
 *
 * @param email
 * @param userId
 * @return {Promise<T>}
 * @private
 */
const _createNewUser = ({email, userId}) => {
    return StripeServices.customers.create({
        email,
        metadata: {
            userId
        }
    }).then(user => {
        const {id} = user

        const stripeUser = new StripeUser({
            owner: userId,
            email,
            stripeUID: id
        })

        return stripeUser.save()
            .then(() => {
                return Promise.resolve(id)
            })
    })
}

/**
 * Get Stripe user object.
 *
 * @param stripeUID
 * @return {Promise<T>}
 * @private
 */
const _getStripeUser = (stripeUID) => {
    return StripeServices.customers.retrieve(stripeUID)
        .then(user => {
            const {id, email, sources, account_balance, metadata} = user
            let cards = []

            const {data} = sources

            if (data && Array.isArray(data)) {
                cards = data.filter(source => {
                    const {object} = source

                    return object === 'card'
                })
            }

            return Promise.resolve({id, email, cards, account_balance, metadata})
        })
}

exports.getStripeUser = ({userId}) => {
    return StripeUser.findOne({
        owner: userId,
        status: 'active'
    }).then(user => {
        if (!user) {
            throw new Error('Stripe user not found.')
        }

        const stripeUID = user.get('stripeUID')
        return _getStripeUser(stripeUID)
    })
}

exports.createStripeUser = ({userId}) => {
    return Promise.all([
        User.findOne({
            _id: userId
        }),
        StripeUser.findOne({
            owner: userId,
            status: 'active'
        })
    ]).then(([user, stripeUser]) => {
        if (!user) {
            throw new Error('User not found.')
        }

        const email = user.get('email')

        if (!stripeUser) {
            return _createNewUser({email, userId})
                .then(stripeUID => {
                    return Promise.resolve([user, stripeUID])
                })
        }

        const stripeUID = stripeUser.get('stripeUID')

        return Promise.resolve([user, stripeUID])
    }).then(([user, stripeUID]) => {

        return _getStripeUser(stripeUID)
            .then(stripeUser => {
                return Promise.resolve(Object.assign({}, stripeUser, {stripeUID}))
            })
    })
}

exports.addCardToCustomer = ({userId, stripeUID, token, form}) => {
    if (!form || Object.keys(form).length === 0) {
        return Promise.reject(new Error('Please reload website and fill full your information.'))
    }

    const {name} = form
    const nameValidated = (name + "").trim()

    if (!nameValidated || nameValidated.length < 3) {
        return Promise.reject(new Error('Please enter you name as shown on the credit card.'))
    }

    return StripeServices.customers.createSource(stripeUID, {
        source: token
    }).then(card => {
        const {id} = card

        return StripeUser.updateOne(
            {
                owner: userId,
            },
            {
                $set: {
                    card: id
                }
            }
        ).then(() => Promise.resolve(card))
    })
}

exports.removeCard = ({userId, stripeUID, cardId}) => {
    return StripeServices.customers.deleteCard(stripeUID, cardId)
        .then(result => {

            return StripeUser.updateOne(
                {
                    owner: userId,
                },
                {
                    $set: {
                        card: null
                    }
                }
            ).then(() => Promise.resolve(result))
        })
}

const _createCharge = ({userId, cardId, total, planId, coupon, billId}) => {
    return Promise.all([
        StripeUser.findOne({
            owner: userId,
        }),
        Plan.findById(planId)
    ]).then(([user, plan]) => {
        if (!user) {
            throw new Error('Stripe user not found.')
        }

        if (!plan) {
            throw new Error('Plan not found.')
        }

        const stripeUID = user.get('stripeUID')
        const email = user.get('email')
        const title = plan.title
        const planId = plan._id.toString() || plan._id

        return user.update({
            $set: {
                card: cardId
            }
        }).then(() => {
            return Promise.resolve({
                stripeUID,
                description: title,
                metadata: {
                    planId,
                    billId: billId.toString() || billId,
                    coupon,
                    userId,
                    email
                }
            })
        })
    }).then(({stripeUID, description, metadata}) => {
        const totalCents = (total * 100).toFixed(0);//total * 100 = cents

        return StripeServices.charges.create({
            amount: totalCents,
            currency: "usd",
            customer: stripeUID,
            description,
            metadata
        }).then(charge => {
            const {paid, failure_code, failure_message, id, balance_transaction, receipt_email, amount, status} = charge

            return Promise.resolve({
                paid,
                failure_code,
                failure_message,
                id,
                balance_transaction,
                receipt_email,
                amount,
                status
            })
        })
    })
}

exports.checkout = ({userId, cardId, planId, coupon, tap_vid, ref_id = ''}) => {
    let meta = {ref_id}

    if (tap_vid) {
        meta = Object.assign({}, meta, {tap_vid})
    }

    return CheckoutActions.createBill({userId, planId, coupon, meta, method: 'card'})
        .then(bill => {
            const billId = bill.get('_id')
            const total = bill.get('price')

            if (total <= 0) {
                return CheckoutActions.updateBill({billId, meta, method: 'card'})
                    .then(() => {
                        return CheckoutActions.completeBill(billId)
                    })
            }

            return _createCharge({userId, cardId, total, planId, coupon, billId})
                .then(({paid, failure_code, failure_message, id, balance_transaction, receipt_email, amount, status}) => {
                    if (failure_code) {
                        throw new Error(failure_message)
                    }

                    const meta = {
                        paid,
                        amount,
                        chargeID: id,
                        balance_transaction,
                        statusCharge: status,
                        receipt_email,
                    }

                    return CheckoutActions.updateBill({billId, meta, method: 'card'}).then(bill => {
                        if (!paid) {
                            throw new Error('This bill has not paid. Please wait a moment or try again later.')
                        }

                        return Promise.resolve(bill)
                    })
                })
                .then(() => {
                    return CheckoutActions.completeBill(billId)
                })
        })
        .then(bill => {
            const billId = bill.get('_id')

            return CheckoutActions.createMembership({userId, billId, canCancel: true})
        })
        .then(membership => {
            const finish = membership.get('finish')
            const membershipId = membership.get('_id')

            Broadcaster.broadcast(NEW_SUBSCRIPTION_AUTO, {
                userId,
                membershipId,
                method: 'card'
            })

            return RecurringActions.addRecurringPayment({userId, plan: planId, coupon, timePayment: finish})
                .then(() => {
                    return Promise.resolve(membership)
                })
        })
}
