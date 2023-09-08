const User = require('../models/User')
const Membership = require('../models/Membership')
const RecurringActions = require('./RecurringActions')

const _getUserByID = (userId) => {
    return User.findById(userId)
        .then(user => {
            if (!user) {
                return Promise.reject(new Error('User not found!'))
            }

            return Promise.resolve(user)
        })
}

exports.getCurrentMembership = (userId) => {
    return _getUserByID(userId)
        .then(user => {
            const membershipId = user.get('membership')

            if (!membershipId) {
                return Promise.resolve({})
            }

            return Membership
                .findOne({
                    _id: membershipId,
                    owner: userId
                })
                .populate('plan')
                .then(membership => {
                    if (!membership) {
                        throw new Error(`Membership not found or was deleted. Membership ID: ${membershipId}`)
                    }

                    return Promise.resolve(membership)
                }).then(membership => {
                    return Promise.resolve(membership.toJSON())
                })
        })
}

exports.cancelMembership = (userId) => {
    return _getUserByID(userId)
        .then(user => {
            return RecurringActions.cancelRecurring(userId)
                .then(() => user)
        })
        .then(user => {
            const membershipId = user.get('membership')

            if (!membershipId) {
                throw new Error('You are not subscribing any plan.')
            }

            return Membership.findOne({
                _id: membershipId,
                owner: userId
            }).then(membership => {
                if (!membership) {
                    throw new Error(`Membership not found or was deleted. Membership ID: ${membershipId}`)
                }

                return Promise.resolve([user, membership])
            })
        }).then(([user, membership]) => {
            const canCancel = membership.get('canCancel')

            if (!canCancel) {
                throw new Error('You cannot cancel current membership.')
            }

            return membership.update({
                $set: {
                    canCancel: false
                }
            })
        })
        .then((updated) => {
            console.log('[CANCEL_MEMBERSHIP]', updated, userId)

            return Promise.resolve(true)
        })
}
