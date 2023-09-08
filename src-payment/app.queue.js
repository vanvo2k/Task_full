const getEnv = require('./helpers/getEnv')
const redisConfig = getEnv('/redisQueue')
const createQueue = require('./libs/createQueue')

console.log('Config queue', redisConfig)

const queue = createQueue({
    redis: redisConfig,
    prefix: 'p_'
})

queue.watchStuckJobs(60000)

process.once('SIGTERM', function (sig) {
    queue.shutdown(10000, function (err) {
        console.log('Kue shutdown: ', err || '')
        process.exit(0)
    })
})

module.exports = queue
