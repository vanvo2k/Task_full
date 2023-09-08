const Schedule = require('node-schedule')
const {EVERY_SIX_HOURS, EVERY_HOUR, EVERY_TWELVE_HOURS} = require('./constants/Crontab')

const OauthCachedServices = require('./services/OauthCachedServices')
const cleanSessionWorker = require('./workers/cleanSession')
const cleanCacheRedis = require('./workers/cleanCacheRedis')

module.exports = () => {
    console.log('[Authentication] Register cron job.')

    Schedule.scheduleJob(EVERY_SIX_HOURS, OauthCachedServices.flushAll)
    Schedule.scheduleJob(EVERY_HOUR, cleanSessionWorker.run)
    Schedule.scheduleJob(EVERY_TWELVE_HOURS, cleanCacheRedis.run)
}
