const OauthServices = require('../services/OauthServices')
const RefreshTokenServices = require('../services/RefreshTokenServices')
const {transporter, PREFIX} = require('../services/TransportServices')
const {AUTH_CREATE_NEW_SESSION_SUCCESS} = require('spyamz-constants').events

/**
 * Call when a user login (start a new session).
 * @param {userId, IP, uuid}
 * @return Promise<T>
 */
exports.createNewSession = ({userId, IP = '', uuid = ''}) => {
    return OauthServices.createSession({userId, IP, uuid})
        .then(token => {
            transporter.publish(`${PREFIX}.${AUTH_CREATE_NEW_SESSION_SUCCESS}`, userId)

            return token
        })
}

/**
 * Generate access token if the access token was expired.
 * @param refreshToken
 * @return Promise<T>
 */
exports.generateAccessToken = (refreshToken) => {
    return RefreshTokenServices.getOwner(refreshToken)
        .then(userId => {
            return OauthServices.newAccessToken({userId, id: userId})
        })
}

/**
 * Revoke refresh token.
 * @param refreshToken
 * @return Promise<T>
 */
exports.revokeRefreshToken = (refreshToken) => {
    if (!refreshToken) {
        return Promise.resolve(true)
    }

    return RefreshTokenServices.revokeRefreshToken(refreshToken)
}
