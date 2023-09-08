const createRedisConnection = require('../libs/createRedisConnection')
const getEnv = require('../helpers/getEnv')
const redisAuth = getEnv('/redisAuth')
console.log({
    redisAuth
})
const client = createRedisConnection(redisAuth)

module.exports = client;