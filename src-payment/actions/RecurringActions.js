const RecurringPayment = require('../models/RecurringPayment')
const CheckoutActions = require('./CheckoutActions')
const StripePaymentActions = require('./StripePaymentActions')

exports.addRecurringPayment = ({userId, plan, coupon = '', timePayment}) => {
    const recurring = new RecurringPayment({
        owner: userId,
        plan,
        coupon,
        timePayment
    })

    return recurring.save()
        .then(re => {
            console.log(re)

            return Promise.resolve(re)
        })
}

exports.cancelRecurring = (userId) => {
    return RecurringPayment.updateMany(
        {
            owner: userId,
            status: 'pending'
        },
        {
            $set: {
                status: 'cancelled',
                updated: Date.now()
            }
        }
    ).then(updated => {
        return Promise.resolve(true)
    })
}

const _confirmRecurringSuccess = (recurringId) => {
    return RecurringPayment.updateOne(
        {
            _id: recurringId,
        },
        {
            $set: {
                status: 'succeeded',
                updated: Date.now()
            }
        }
    )
}

const _retryRecurring = (recurringId, error) => {
    const message = error.message || String(error)
    console.error(error.code, error.type)

    return RecurringPayment.updateOne(
        {
            _id: recurringId,
        },
        {
            $set: {
                status: 'pending',
                updated: Date.now()
            },
            $inc: {
                retries: 1
            },
            $push: {
                messages: message
            }
        }
    )
}

exports.recurringPayment = (recurringId) => {
    return RecurringPayment.findById(recurringId)
        .then(recurring => {
            if (!recurring) {
                throw new Error(`Recurring payment not found. ID: ${recurringId}`)
            }

            return Promise.resolve(recurring)
        })
        .then(recurring => {
            const userId = recurring.get('owner')
            const planId = recurring.get('plan')
            const coupon = recurring.get('coupon')

            return CheckoutActions.createBill({userId, planId, coupon, method: 'card'})
        })
        .then(bill => {
            const billId = bill.get('_id')
            const total = bill.get('price')
            const userId = bill.get('owner')
            const description = bill.get('title')

            return StripePaymentActions.charge({userId, total, billId, description})
                .then(paid => {
                    if (!paid) {
                        throw new Error('Bill has not been paid.')
                    }

                    return _confirmRecurringSuccess(recurringId)
                })
                .then(() => {
                    return CheckoutActions.completeBill(billId)
                })
        })
        .then(bill => {
            const billId = bill.get('_id')
            const userId = bill.get('owner')

            return CheckoutActions.createMembership({userId, billId, canCancel: true})
                .then(membership => {
                    return Promise.resolve({membership, bill})
                })
        })
        .then(({membership, bill}) => {
            const finish = membership.get('finish')
            const coupon = bill.get('coupon')
            const planId = bill.get('plan')
            const userId = bill.get('owner')

            return exports.addRecurringPayment({userId, plan: planId, coupon, timePayment: finish})
                .then(() => {
                    return Promise.resolve(membership)
                })
        })
        .catch(error => {
            console.error('RECURRING_PAYMENT_ERROR', error)
            console.error('RECURRING_PAYMENT_ERROR', JSON.stringify(error))

            return _retryRecurring(recurringId, error)
                .then(() => {
                    return Promise.reject(error)
                })
        })
}
