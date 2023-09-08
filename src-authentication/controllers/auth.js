const authHelpers = require('tamz-middleware/helpers/auth')
const getUserIP = require('../helpers/getUserIP')
const AuthActions = require('../actions/AuthActions')
const {sendError, sendSuccess} = require('../helpers/response')
const clientRedis = require('../connections/redis')

exports.logout = (req, res) => {
    const refreshToken = authHelpers.getRefreshToken(req)

    if (!refreshToken) {
        return sendSuccess(req, res)(true)
    }

    AuthActions.logout({refreshToken})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.validateRefreshToken = (req, res, next) => {
    const refreshToken = authHelpers.getRefreshToken(req)

    if (!refreshToken || refreshToken === 'null' || refreshToken === 'undefined') {
        return res.status(403).send({
            success: false,
            message: 'The refresh token is empty.'
        })
    }

    const uuid = req.headers['x-uid'] || req.headers['x-uuid'] || req.body['x-uuid'] || req.query['x-uuid'] || ''
    const IP = getUserIP(req)
    const appVersion = req.body['app-version'] || req.query['app-version'] || req.headers['x-app-version'] || ''
    const recapcha = req.headers['x-recapcha'] || ''

    AuthActions.validateRefreshToken({refreshToken, uuid, IP, appVersion, recapcha})
        .then(valid => {
            if (valid) {
                return next()
            }

            return res.status(403).send({
                success: false,
                message: 'Something went wrong. Please try again later.'
            })
        })
        .catch(error => {
            console.error('VALIDATE_HEART_BEAT', error)

            return res.status(403).send({
                success: false,
                message: 'Something went wrong. Please try again later.'
            })
        })
}

exports.getToken = (req, res) => {
    const refreshToken = authHelpers.getRefreshToken(req)

    if (!refreshToken || refreshToken === 'null' || refreshToken === 'undefined') {
        return res.status(403).send({
            success: false,
            message: 'The refresh token is empty.'
        })
    }

    AuthActions.getAccessToken(refreshToken)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}


exports.validateHeartbeat = (req, res, next) => {
    const refreshToken = authHelpers.getRefreshToken(req)
    const userId = authHelpers.authenticatedUserId(req)
    const IP = getUserIP(req)
    console.log('[HEART_BEAT] Validate:', userId, IP)

    AuthActions.validateHeartbeat({refreshToken})
        .then(() => {
            return next()
        })
        .catch(error => {
            console.error('VALIDATE_HEART_BEAT', error)

            return res.status(403).send({
                success: false,
                message: 'Something went wrong. Please try again later.'
            })
        })
}

exports.heartbeat = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)
    const IP = getUserIP(req)
    const referer = req.headers['referer'] || ''

    console.log('[HEART_BEAT] User:', userId, IP, referer)
    const allowHosts = ['spyamz.com', 'localhost']
    let isAllow = false
    allowHosts.forEach(host => {
        if (referer.indexOf(host) !== -1) {
            isAllow = true
        }
    })

    if (!isAllow) {
        console.log('[VCTT]', userId, IP, referer)

        clientRedis.hsetAsync('vctt', userId, IP)
    }

    AuthActions.heartbeat({userId, IP})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}