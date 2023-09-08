const User = require('../models/User')
const Plan = require('../models/Plan')
const CheckoutActions = require('./CheckoutActions')
const { NEW_REGISTER_TRIAL } = require('../constants/Events')
const Broadcaster = require('tamz-broadcaster')
const PusherServices = require('tamz-pusher-services')

const _saveUserSignedUpTrial = (userId) => {
    return User.updateOne(
        {
            _id: userId,
        },
        {
            $set: {
                isSignedUpTrial: true,
            },
        }
    ).then(() => {
        return User.findById(userId)
    })
}

exports.checkout = ({ userId, planId }) => {
    return Promise.all([User.findById(userId), Plan.findById(planId)])
        .then(([user, plan]) => {
            if (!user) {
                throw new Error(`User not found. UserID: ${userId}`)
            }

            if (!plan) {
                throw new Error(`Plan not found. PlanID: ${planId}`)
            }

            return Promise.resolve([user, plan])
        })
        .then(([user, plan]) => {
            const isSignedUpTrial = user.get('isSignedUpTrial')
            const membership = user.get('membership')
            console.log(
                '==============================================================================Free-Action'
            )
            console.log(user)

            if (membership) {
                const error = new Error('You are using another (dieu kien membership)')
                error.code = 'plan'
                // return Promise.reject(error)
                return CheckoutActions.createBill({userId, planId})
            }

            if (isSignedUpTrial) {
                const error = new Error('You only subscribes to the trial plan once.')
                error.code = 'plan'

                return Promise.reject(error)
            }

            const price = plan.get('price')

            if (price > 0) {
                throw new Error('Cheat uh? It is paid plan.')
            }

            return CheckoutActions.createBill({ userId, planId })
        })
        .then((bill) => {
            const billId = bill.get('_id')

            return CheckoutActions.completeBill(billId)
                .then(() => {
                    return CheckoutActions.createMembership({ userId, billId })
                })
                .then((membership) => {
                    _saveUserSignedUpTrial(userId)
                    Broadcaster.broadcast(NEW_REGISTER_TRIAL, {
                        userId,
                    })

                    PusherServices.triggerHeartBeat(userId)

                    return Promise.resolve(membership)
                })
        })
}

exports.canSignUpTrialPlan = ({ userId }) => {
    return User.findById(userId)
        .then((user) => {
            if (!user) {
                throw new Error(`User not found. UserID: ${userId}`)
            }

            return Promise.resolve(user)
        })
        .then((user) => {
            const isSignedUpTrial = !user.get('isSignedUpTrial')

            return Promise.resolve(isSignedUpTrial)
        })
}
