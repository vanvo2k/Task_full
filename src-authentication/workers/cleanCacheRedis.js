const RateLimit = require('tamz-middleware/middleware/RateLimit')

exports.run = () => {
    return RateLimit.flushAll()
        .then(() => {
            console.log('Flush all cache rate limit.')
        })
        .catch(error => {
            console.log('REMOVE_CACHE_RATE_LIMIT', error)
        })
}
