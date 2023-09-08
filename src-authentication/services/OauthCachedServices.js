const redisClient = require('../connections/redis')
const Promise = require('bluebird')

const expireTime = 1800
const _prefix = 'spz:'
const _getUserKey = userId => `${_prefix}user:${userId}`

exports.flushCache = userId => {
    const key = _getUserKey(userId)

    return redisClient.delAsync(key)
        .then(() => true)
}

exports.flushAll = () => {
    const key = 'spz:user:*'

    return new Promise((resolve, reject) => {
        redisClient.keys(key, (error, rows) => {
            if (error) {
                return reject(error)
            }

            Promise.map(rows, row => redisClient.delAsync(row), {concurrency: 10})
                .then(() => resolve(true))
                .catch(error => reject(error))
        })
    })
}

exports.isCachedUserProperty = (userId, field) => {
    const key = _getUserKey(userId)

    return redisClient.hexistsAsync(key, field)
}

exports.getUserPropertyCached = (userId, field) => {
    const key = _getUserKey(userId)

    return redisClient.hgetAsync(key, field)
        .then(str => {
            try {
                return Promise.resolve(JSON.parse(str))
            } catch (error) {
                return Promise.resolve(null)
            }
        })
}

exports.cacheUserProperty = (userId, field, value) => {
    const key = _getUserKey(userId)

    return redisClient.hsetAsync(key, field, JSON.stringify(value))
        .then(response => {
            redisClient.expireAsync(key, expireTime)

            return Promise.resolve(response)
        })
};