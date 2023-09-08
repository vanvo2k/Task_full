const redis = require("redis")

const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

module.exports = (args) => {
    const client = redis.createClient(args)

    process.on('SIGINT', () => {
        client.quit()
    })

    client.on('error', (error) => {
        console.error(error)

        process.exit(0)
    })

    return client
};