const Plan = require('../models/Plan')
const User = require('../models/User')
const Membership = require('../models/Membership')

exports.getPlanDetail = ({userId, planId, isAdmin}) => {
    const query = {
        _id: planId,
        status: 'active',
        public: true
    }

    if (isAdmin) {
        delete query.public
    }

    return Plan.findOne(query).then(plan => {
        if (!plan) {
            throw new Error('Plan not found.')
        }

        return Promise.resolve(plan)
    }).then(plan => {
        return User.findById(userId)
            .then(user => {
                if (!user) {
                    return Promise.reject(new Error('User not found!'))
                }

                return Promise.resolve(user)
            })
            .then(user => {
                const membershipId = user.membership

                if (!membershipId) {
                    return Promise.resolve([plan, false])
                }

                return Membership.findById(membershipId)
                    .then(membership => {
                        if (!membership) {
                            throw  new Error('Membership not found!')
                        }

                        return Promise.resolve(membership)
                    })
                    .then((membership) => {
                        const isExpired = membership.isExpired()
                        const currentPlanId = isExpired ? membership.get('plan') : false

                        return Promise.resolve([plan, currentPlanId])
                    })
            })
    }).then(([plan, currentPlan]) => {
        if (!currentPlan || plan.get('_id') !== currentPlan) {
            return Promise.resolve(plan.toJSON())
        }

        const object = plan.toJSON()
        const computed = Object.assign({}, object, {active: true})

        return Promise.resolve(computed)
    })
}

exports.getActivePlans = ({userId, isAdmin}) => {
    let query = {
        status: 'active',
        private: false
    }

    if (isAdmin) {
        delete query.private
    }

    return Plan
        .find(query)
        .sort({level: 1})
        .then((plans) => {
            if (!userId) {
                return Promise.resolve([plans, false])
            }

            return User.findById(userId)
                .then(user => {
                    if (!user) {
                        return Promise.reject(new Error('User not found!'))
                    }

                    return Promise.resolve(user)
                })
                .then(user => {
                    const membershipId = user.membership

                    if (!membershipId) {
                        return Promise.resolve([user, false])
                    }

                    return Membership.findById(membershipId)
                        .then(membership => {
                            return Promise.resolve([user, membership])
                        })
                        .catch(error => {
                            console.error(error)

                            return Promise.resolve([user, false])
                        })
                })
                .then(([user, membership]) => {
                    const isExpired = membership ? membership.isExpired() : true
                    const currentPlanId = !isExpired ? membership.get('plan') : false

                    return Promise.resolve([plans, currentPlanId])
                })
        })
        .then(([plans, currentPlan]) => {
            const plans_ = plans.map((plan) => {
                const planObject = plan.toJSON()
                const _id = plan.get('_id').toString()

                let active = false
                if (_id === currentPlan.toString()) {
                    active = true
                }

                return Object.assign(planObject, {active})
            })

            return Promise.resolve(plans_)
        })
}
