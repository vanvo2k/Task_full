const User = require('../models/User')
const Membership = require('../models/Membership')
const Plan = require('../models/Plan')
const OauthServices = require('../services/OauthServices')
const OauthCachedServices = require('../services/OauthCachedServices')
const uniqueArray = require('../helpers/uniqueArray')

const _getScopesFromMembershipId = (membershipId) => {
    if (!membershipId) {
        return Promise.resolve([])
    }

    return Membership
        .findOne({
            _id: membershipId,
            finish: {
                $gt: Date.now()
            }
        })
        .populate('plan', Plan)
        .then(membership => {
            if (!membership) {
                throw new Error(`Membership not found! ID: ${membershipId}`)
            }

            if (membership.status !== 'active') {
                throw new Error('Membership is not active.')
            }

            return membership
        })
        .then(membership => {
            const plan = membership.get('plan')

            if (!plan) {
                throw new Error('Plan not found.')
            }

            if (plan.get('status') !== 'active') {
                throw new Error('Plan is inactive.')
            }

            const capabilities = plan.get('capabilities')

            return Array.isArray(capabilities) ? capabilities : []
        })
        .catch(error => {
            console.error("GET_SCOPES_BY_MEMBERSHIP", error)

            return Promise.resolve([])
        })
}

const _getScopesByUserId = (userId) => {
    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new Error('User not found.')
            }

            return Promise.resolve(user)
        })
        .then(user => {
            const status = user.get('status')

            if (status === 'blocked') {
                throw new Error('User was blocked.')
            }

            return Promise.resolve(user)
        })
        .then(user => {
            const roles = user.get('roles') || []
            const membershipId = user.get('membership')

            return _getScopesFromMembershipId(membershipId)
                .then(scopesByMembership => {
                    const scopesByRoles = OauthServices.mapRolesToScopes(roles)

                    const scopes = [].concat(scopesByRoles, scopesByMembership)
                    const uniqueScopes = uniqueArray(scopes)

                    return Promise.resolve(uniqueScopes)
                })
        })
        .catch(error => {
            console.error(error)

            return Promise.resolve([])
        })
}

const _getRolesByUserId = userId => {
    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new Error('User not found.')
            }

            return Promise.resolve(user)
        }).then(user => {
            const status = user.get('status')

            if (status === 'blocked') {
                throw new Error('User was blocked.')
            }

            return Promise.resolve(user)
        })
        .then(user => {
            const roles = user.get('roles') || []

            return Promise.resolve(roles)
        })
        .catch(error => {
            console.error(error)

            return Promise.resolve([])
        })
}

exports.flushCache = userId => {
    return OauthCachedServices.flushCache(userId)
}

/**
 * Get scopes by user ID.
 *
 * @param userId
 * @return Promise<T>
 */
exports.getScopesByUserId = userId => {
    return OauthCachedServices.isCachedUserProperty(userId, 'scopes')
        .then(exists => {
            if (exists) {
                return OauthCachedServices.getUserPropertyCached(userId, 'scopes')
            }

            return _getScopesByUserId(userId)
                .then(scopes => {
                    OauthCachedServices.cacheUserProperty(userId, 'scopes', scopes)

                    return Promise.resolve(scopes)
                })
        })
}

/**
 * Get roles by user ID.
 *
 * @param userId
 * @return Promise<T>
 */
exports.getRolesByUserId = userId => {
    return OauthCachedServices.isCachedUserProperty(userId, 'roles')
        .then(exists => {
            if (exists) {
                return OauthCachedServices.getUserPropertyCached(userId, 'roles')
            }

            return _getRolesByUserId(userId)
                .then(roles => {
                    OauthCachedServices.cacheUserProperty(userId, 'roles', roles)

                    return Promise.resolve(roles)
                })
        })
};
