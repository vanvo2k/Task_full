const User = require('../models/User')
const Plan = require('../models/Plan')
const FreeActions = require('../actions/FreeActions')

exports.registerTrialPlan = (userId) => {
    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new Error('User not found!')
            }

            return user
        })
        .then(user => {
            const membership = user.get('membership')

            if (membership) {
                throw new Error('User subscribed a plan.')
            }

            return user
        })
        .then(user => {
            return Plan.findOne({
                slug: 'trial'
            }).then(plan => {
                if (!plan) {
                    throw new Error('There are no trial plan.')
                }

                return plan.get('_id')
            }).then(planId => {
                return {
                    userId: user.get('_id'),
                    planId
                }
            })
        })
        .then(({userId, planId}) => {
            return FreeActions.checkout({userId, planId})
        })
}
