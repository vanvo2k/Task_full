const request = require('request-promise-native')
const getEnv = require("../helpers/getEnv")
const Bill = require('../models/Bill')
const Plan = require('../models/Plan')
const Coupon = require('../models/Coupon')
const CheckoutActions = require('./CheckoutActions')
const {getEmailReceiver, getLinkSubscription} = require("../helpers/paypal")
const Broadcaster = require('tamz-broadcaster')
const {NEW_SUBSCRIPTION_AUTO} = require('../constants/Events')

const ipnEndpoint = getEnv('/PayPal/ipn_endpoint')
console.log('IPN Endpoint', ipnEndpoint)

const _checkCouponAvailable = coupon => {
    if (!coupon) {
        return Promise.resolve(false)
    }

    return Coupon.findOne({code: coupon})
        .then(coupon => {
            if (!coupon) {
                return Promise.resolve(false)
            }

            const duration = coupon.get('duration')

            return Promise.resolve(duration === 'forever')
        })
        .catch(() => Promise.resolve(false))
}

exports.checkCouponAvailable = _checkCouponAvailable

exports.checkout = ({userId, planId, coupon = '', ref_id = ''}) => {
    if (!planId) {
        return Promise.reject(new Error('Plan Id not found!'))
    }

    return Promise
        .all([
            Plan.findById(planId),
            _checkCouponAvailable(coupon)
        ])
        .then(([plan, isAvailable]) => {
            if (!plan) {
                throw new Error('Plan not found!')
            }

            return Promise.resolve([plan, isAvailable])
        })
        .then(([plan, isAvailable]) => {
            const meta = {
                ref_id,
                coupon,
                receiver_email: getEmailReceiver()
            }

            const couponCode = isAvailable ? coupon : ''

            return CheckoutActions.createBill({userId, planId, meta, method: 'paypal', coupon: couponCode})
                .then(bill => {
                    return Promise.resolve([plan, bill])
                })
        })
        .then(([plan, bill]) => {
            const billId = bill.get('_id').toString()
            const title = bill.get('title')
            const total = bill.get('price')

            /**
             * Redirect to paypal.
             */
            const {currency, _id, durationAmount, durationUnit} = plan.toObject()
            const redirectTo = getLinkSubscription({
                userId,
                planId: _id,
                billId,
                title,
                price: total,
                currency,
                durationAmount,
                durationUnit
            })

            return Promise.resolve({
                redirect: redirectTo
            })
        })
}

exports.validateIPN = (data) => {
    return request({
        uri: ipnEndpoint,
        method: 'POST',
        form: data,
    }).then(response => {
        if (response === 'VERIFIED') {
            return Promise.resolve()
        }

        console.log('[VERIFY_PAYPAl_RESPONSE]', response)

        return Promise.reject(new Error('Invalid IPN.'))
    })
}

exports.validateBilling = (billId) => {
    return Bill.findById(billId)
        .then((bill) => {
            if (!bill) {
                throw new new Error(`Bill not found. BillID: ${billId}`)
            }

            return Promise.resolve(bill)
        })
}

exports.ipn = ({postData, billId}) => {
    const {
        txn_id,
        payment_status,
        mc_gross,
        mc_currency,
        receiver_email,
        payer_email,
        payment_date,
        last_name,
        ipn_track_id,
        residence_country
    } = postData

    console.log('[PAYPAL_IPN_TEST]', billId, JSON.stringify(postData))

    if (!txn_id) {
        return Promise.resolve('Skip!')
    }

    if (payment_status !== 'Completed') {
        return Promise.resolve('Pending!')
    }

    return Bill.count({"extend.txn_id": txn_id, status: "completed"})
        .then(total => {
            if (total > 0) {
                return Promise.reject({skip: true, message: 'Bill was created!'})
            }

            return Bill.findById(billId)
        })
        .then(bill => {
            const {price, currency, _id, extend} = bill.toJSON()
            const email = extend.receiver_email

            if (email !== receiver_email) {
                console.error('Receiver email wrong!', _id)

                return Promise.reject('Receiver email wrong!')
            }

            if (parseFloat(mc_gross) !== parseFloat(price)) {
                console.error('Price wrong!', _id)

                return Promise.reject('price wrong!')
            }

            if (currency !== mc_currency) {
                console.error('Currency wrong!', _id)

                return Promise.reject('Currency wrong!')
            }

            const billStatus = bill.get('status')
            const userId = bill.get('owner')
            const planId = bill.get('plan')
            const meta = bill.get('extend') || {}
            const coupon = bill.get('coupon') || ''

            const newMeta = {
                txn_id,
                payment_date,
                ipn_track_id,
                payer_name: last_name,
                payer_email,
                payer_country: residence_country,
            }

            const oldTXNID = meta.txn_id

            if (oldTXNID && oldTXNID === txn_id) {
                return Promise.reject({skip: true})
            }

            if (billStatus === 'completed') {
                return CheckoutActions.createBill({
                    userId,
                    planId,
                    meta,
                    method: 'paypal',
                    coupon,
                }).then((newBill) => {
                    const billId = newBill.get('_id')

                    return Promise.resolve({billId, meta: newMeta})
                })
            }

            return Promise.resolve({billId, meta: newMeta})
        })
        .then(({billId, meta}) => {
            return CheckoutActions.completeBill(billId)
                .then(() => {
                    return CheckoutActions.updateBill({billId, meta, method: 'paypal'})
                })
        })
        .then(async (bill) => {
            const userId = bill.owner
            const billId = bill._id

            const membership = await CheckoutActions.createMembership({
                userId,
                billId,
                canCancel: false
            })

            return {membership, userId}
        })
        .then(({membership, userId}) => {
            const membershipId = membership.get('_id')

            Broadcaster.broadcast(NEW_SUBSCRIPTION_AUTO, {
                userId,
                membershipId,
                method: 'paypal'
            })

            return Promise.resolve(membership)
        })
        .catch(error => {
            if (error.skip) {
                return Promise.resolve(error)
            }

            return Promise.reject(error)
        })
}

exports.testIPN = ({postData, billId}) => {
    const {
        txn_id,
        payment_date,
        ipn_track_id,
        last_name,
        payer_email,
        residence_country
    } = postData

    return Bill.findById(billId)
        .then(bill => {
            if (!bill) {
                throw new Error('Bill not found!')
            }

            return Promise.resolve(bill)
        })
        .then(bill => {
            return bill.completed({
                extend: {
                    txn_id,
                    payment_date,
                    ipn_track_id,
                    payer_name: last_name,
                    payer_email,
                    payer_country: residence_country,
                }
            })
        })
        .then((bill) => {
            return Promise.resolve('ok')
        })
}
