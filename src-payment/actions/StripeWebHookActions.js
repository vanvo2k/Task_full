const Bill = require('../models/Bill')
const CheckoutActions = require('../actions/CheckoutActions')
const StripeServices = require('../services/StripeServices')
const StripeUser = require('../models/StripeUser')
const getEnv = require('../helpers/getEnv')
const LoggerServices = require('../services/LoggerServices')
const RecurringActions = require('./RecurringActions')
const Broadcaster = require('tamz-broadcaster')
const {NEW_SUBSCRIPTION_AUTO} = require('../constants/Events')

const webHookSecret = getEnv('/stripe/webHookSecret')

exports.webHook = ({signature, body}) => {
    try {
        const event = StripeServices.webhooks.constructEvent(body, signature, webHookSecret)

        const {id, type, data} = event

        const {object} = Object.assign({}, {object: {}}, data)
        const {metadata} = Object.assign({}, {metadata: {}}, object)
        const {site} = Object.assign({}, {site: ''}, metadata)

        if (site === 'spyfb') {
            return Promise.resolve(site)
        }

        console.log(`Event TYPE: ${type}`)

        switch (type) {
            case 'customer.deleted':
                return _deleteUser(event)

            case 'charge.succeeded':
                return _chargeSucceeded(event)
        }

        return Promise.resolve(id)
    }
    catch (err) {
        console.error(err)

        return Promise.resolve(false)
    }
}

const _deleteUser = (event) => {
    const eventID = event.id
    const {object} = event.data
    const {id, metadata} = object
    const {userId} = metadata

    LoggerServices.log('STRIPE_WEB_HOOK', `Customer was deleted. StripeUID: ${id} - UserID: ${userId}`)

    return StripeUser.remove({
        stripeUID: id,
        owner: userId,
        status: 'active'
    }).then(result => {
        LoggerServices.log('STRIPE_WEB_HOOK', `Remove user: ${JSON.stringify(result)}`)

        return Promise.resolve(eventID)
    })
}

const _chargeSucceeded = (event) => {
    const {object} = event.data
    const {metadata} = object
    const {userId, planId, billId, email} = metadata

    return Bill.findById(billId)
        .then(bill => {
            if (!bill) {
                LoggerServices.error('STRIPE_WEB_HOOK', `Bill not found. BillID: ${[billId, userId, email].toString()}`)

                throw new Error(`Bill not found. BillID: ${[billId, userId, email].toString()}`)
            }

            return Promise.resolve(bill)
        }).then(bill => {
            const status = bill.get('status')

            if (status === 'completed') {
                LoggerServices.log('STRIPE_WEB_HOOK', `Bill was paid. BillID: ${billId}`)

                return Promise.reject({skip: true, event})
            }

            const meta = {
                paid: object.paid,
                amount: object.amount,
                chargeID: object.id,
                balance_transaction: object.balance_transaction,
                statusCharge: object.status,
                receipt_email: object.receipt_email,
            }

            return CheckoutActions.updateBill({billId, meta, method: 'card'})
        }).then(() => {
            return CheckoutActions.completeBill(billId)
        })
        .then(bill => {
            return CheckoutActions.createMembership({userId, billId, canCancel: true})
                .then(membership => {
                    return Promise.resolve({membership, bill})
                })
        })
        .then(({membership, bill}) => {
            const finish = membership.get('finish')
            const coupon = bill.get('coupon')

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
        .catch(error => {
            if (error.skip === true) {
                return Promise.resolve(error)
            }

            return Promise.reject(error)
        })
}
