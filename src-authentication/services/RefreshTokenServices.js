const User = require('../models/User')
const Session = require('../models/Session')
const Moment = require('moment')
const randToken = require('rand-token')
const BlackListedServices = require('tamz-middleware/services/BlackListedServices')
const Promise = require('bluebird')

const _revokeAllTokens = async (userId) => {
    try {
        const oneHour = 3600
        const sessions = await Session.find({owner: userId, status: 'active'})

        await Promise.map(sessions, async session => {
            const tokens = Array.isArray(session.tokens) ? session.tokens : []
            tokens.filter(token => !!token)
                .forEach(token => {
                    BlackListedServices.addToBackList(token, oneHour)
                })

            await Session.updateOne(
                {
                    _id: session._id
                },
                {
                    $set: {
                        status: 'revoked',
                        message: 'another login',
                        updated: Date.now()
                    }
                }
            )
        }, {concurrency: 1})

        return true
    } catch (e) {
        return true
    }
}

exports.saveAccessToken = async (refreshToken, accessToken = '') => {
    if (!refreshToken || !accessToken) return false

    const session = await Session.findOne({refreshToken})

    if (!session) return false

    await session.update({
        $push: {
            tokens: accessToken
        }
    })
}

exports.getOwner = (refreshToken) => {
    return Session
        .findOne({
            refreshToken
        })
        .then(token => {
            if (!token) {
                throw new Error('Refresh token not found!')
            }

            return Promise.resolve(token)
        })
        .then(token => {
            const status = token.get('status')

            if (status === 'revoked') {
                throw new Error('Refresh token was revoked.')
            }

            return Promise.resolve(token)
        })
        .then(token => {
            const expires = token.get('expired')
            const expiresMoment = Moment(expires)

            if (Moment().isAfter(expiresMoment)) {
                throw new Error('Refresh token expired.')
            }

            const userId = token.get('owner')

            return Promise.resolve(userId)
        })
}

exports.createRefreshToken = ({userId, IP, uuid, accessToken = ''}) => {
    const expiredAt = Moment().add(1, 'month').valueOf()
    const refreshToken = randToken.uid(40)

    const args = {
        refreshToken: refreshToken,
        owner: userId,
        expired: expiredAt,
    }

    if (accessToken) {
        args.tokens = [accessToken]
    }

    if (IP) {
        args.IP = IP
        args.IPs = [IP]
    }

    if (uuid) {
        args.uuid = uuid
        args.uuids = [uuid]
    }

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new Error('User not found')
            }

            return user
        })
        .then(user => {
            // Temporary solution: allow multi login
            return Promise.resolve(true)

            // const roles = user.get('roles') || []
            // if (roles && (roles.indexOf('mod') !== -1 || roles.indexOf('admin') !== -1)) {
            //     return Promise.resolve(true)
            // }

            // return _revokeAllTokens(userId)
        })
        .then(() => {
            const newToken = new Session(args)

            return newToken.save()
        })
        .then(token => {
            return token.get('refreshToken')
        })
}

exports.revokeRefreshToken = (refreshToken) => {
    return Session
        .update({
            _id: refreshToken
        }, {
            $set: {
                status: 'revoked'
            }
        })
        .then(() => Promise.resolve(true))
        .catch(() => Promise.resolve(true))
}


