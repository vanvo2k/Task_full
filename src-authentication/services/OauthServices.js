const jwt = require('jsonwebtoken')
const uniqueArray = require('../helpers/uniqueArray')
const getEnv = require('../helpers/getEnv')
const ms = require('ms')
const RefreshTokenServices = require('./RefreshTokenServices')
const OauthCachedServices = require('./OauthCachedServices')

const secretKey = getEnv('/secretKey')

const _rolesToScopes = {
    user: ['user'],
    admin: ['admin', 'all', 'super-private'],
    "super-admin": ['super-admin', 'admin', 'all'],
    mod: ['all', 'super-private', 'standard', 'standard-uk', 'standard-de'],
    beta: ["access-beta"],
    "beta-checktm": ["beta-checktm"],
    "ggs-user": ["ggs-user"],
    "csv-export": ["csv-export"]
}

exports.mapRolesToScopes = (roles) => {
    const rolesValidated = !Array.isArray(roles) ? [roles] : roles

    if (!rolesValidated || !Array.isArray(rolesValidated) || !rolesValidated.length) {
        return []
    }

    let scopes = []
    rolesValidated.forEach(role => {
        if (role && _rolesToScopes[role]) {
            const _scopes = _rolesToScopes[role]

            scopes = [].concat(scopes, _scopes)
        }
    })

    return uniqueArray(scopes)
}

const expiresTime = process.env.NODE_ENV !== 'production' ? '2 minutes' : '24 hours'

const _generateAccessToken = (payload) => {
    const accessToken = jwt.sign(payload, secretKey, {
        expiresIn: expiresTime
    })

    return Promise.resolve(accessToken)
}

const _buildTokenObject = (accessToken) => {
    return {
        'token_type': 'bearer',
        'access_token': accessToken,
        'expires_in': ms(expiresTime) / 1000,
    }
}

exports.newAccessToken = (payload, done = null) => {
    return _generateAccessToken(payload)
        .then(accessToken => {
            typeof done === 'function' && done(accessToken)

            return _buildTokenObject(accessToken)
        })
}

exports.createSession = async ({userId, IP = '', uuid = ''}) => {
    const payload = {userId, id: userId}

    const accessToken = await _generateAccessToken(payload)
    const refreshToken = await RefreshTokenServices.createRefreshToken({userId, IP, uuid, accessToken})

    await OauthCachedServices.flushCache(userId)

    return Object.assign({}, _buildTokenObject(accessToken), {
        'refresh_token': refreshToken
    })
}
