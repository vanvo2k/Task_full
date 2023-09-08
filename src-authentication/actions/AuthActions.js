const User = require('../models/User')
const Session = require('../models/Session')
const RefreshTokenServices = require('../services/RefreshTokenServices')
const OauthServices = require('../services/OauthServices')
const UserActions = require('./UserActions')

exports.logout = ({refreshToken}) => {
    return Session.findOne({
        status: 'active',
        refreshToken: (refreshToken + '').trim(),
        expired: {
            $gt: Date.now()
        }
    }).then(session => {
        if (!session) {
            return true
        }

        const userId = session.get('owner')
        console.log('USER_LOGOUT', userId)

        return session.updateOne({
            $set: {
                status: 'revoked',
                message: 'LOGGED_OUT'
            }
        })
    }).then(() => true)
}

const _revokeFaudulentSession = (sessionId) => {
    console.log('REVOKE_SESSION', sessionId)

    return Session.update(
        {
            _id: sessionId,
            status: 'active'
        },
        {
            $set: {
                status: 'revoked',
                message: 'FRAUDULENT',
                updated: Date.now()
            }
        }
    ).then(() => true)
}

/**
 * Validate refresh token.
 *
 * @return Promise<T>
 */
exports.validateRefreshToken = ({refreshToken, uuid, IP, appVersion, recapcha}) => {
    let userId = null

    if (!uuid) {
        return Promise.reject(new Error('uuid is empty.'))
    }

    return RefreshTokenServices.getOwner(refreshToken)
        .then(userId => {
            if (!userId) {
                throw new Error('User not found.')
            }

            return User.findById(userId)
        })
        .then(user => {
            if (!user) {
                throw new Error('User not found.')
            }

            userId = user.get('_id')

            return user
        })
        .then(user => {
            const IPs = user.IPs
            const IPsValidated = Array.isArray(IPs) ? IPs : []

            if (IPsValidated.indexOf(IP) === -1) {
                user.update({
                    $push: {
                        IPs: IP
                    }
                }).exec()
            }

            return Session.findOne({
                refreshToken,
                status: 'active',
                expired: {
                    $gt: Date.now()
                }
            }).then(session => {
                if (!session) {
                    throw new Error('Session was revoked or expired.')
                }

                return session
            })
        })
        .then(session => {
            const uuids = session.get('uuids')
            const IPs = session.get('IPs')

            const uuidsValidated = Array.isArray(uuids) ? uuids : []
            const IPsValidated = Array.isArray(IPs) ? IPs : []

            if (uuids.indexOf(uuid) === -1) {
                uuidsValidated.push(uuid)
            }

            if (IPsValidated.indexOf(IP) === -1) {
                IPsValidated.push(IP)
            }

            return session.update({
                $set: {
                    uuids: uuidsValidated,
                    IPs: IPsValidated,
                    updated: Date.now()
                }
            }).then(() => Session.findById(session._id))
        })
        .then(session => {
            const sessionId = session.get('_id')
            const uuids = session.get('uuids') || []
            const IPs = session.get('IPs') || []

            const oldUUID = session.get('uuid')
            const originIP = session.get('IP')


            // if (oldUUID && uuid && uuid !== oldUUID && uuids.length > 2 && IPs.length > 2 && originIP !== IP) {
            //     console.error('FRAUDULENT_USER', userId, sessionId)
            //
            //     _revokeFaudulentSession(sessionId)
            //     return false
            // }
            //
            // if (uuids.length > 3) {
            //     _revokeFaudulentSession(sessionId)
            //
            //     return false
            // } else if (IPs.length > 5) {
            //     _revokeFaudulentSession(sessionId)
            //
            //     return false
            // }

            return true
        })
}

/**
 * Get access token.
 *
 * @return Promise<T>
 */
exports.getAccessToken = (refreshToken) => {
    const _saveAccessToken = async accessToken => {
        await RefreshTokenServices.saveAccessToken(refreshToken, accessToken)
    }

    return RefreshTokenServices.getOwner(refreshToken)
        .then(userId => {
            return OauthServices.newAccessToken({userId, id: userId}, _saveAccessToken)
        })
}

exports.validateHeartbeat = ({refreshToken}) => {
    return Session.findOne({
        refreshToken,
        status: 'active',
        expired: {
            $gt: Date.now()
        }
    }).then(session => {
        if (!session) {
            throw new Error('Session was revoked or expired.')
        }

        return true
    })
}

exports.heartbeat = ({userId, IP}) => {
    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new Error('User not found')
            }

            return user
        })
        .then(user => {
            const IPs = user.IPs
            const IPsValidated = Array.isArray(IPs) ? IPs : []

            const $update = {
                $set: {
                    heartbeat: Date.now()
                }
            }

            if (IPsValidated.indexOf(IP) === -1) {
                $update['$push'] = {
                    IPs: IP
                }
            }

            return user.update($update)
        })
        .then(() => {
            return Promise.all([
                UserActions.getScopesByUserId(userId),
                UserActions.getRolesByUserId(userId)
            ])
        })
        .then(([scopes, roles]) => {
            return {
                scopes,
                roles
            }
        })
}
