const createConnection = require('./libs/createConnection')
const getEnv = require('./helpers/getEnv')

const mongoDBConfig = getEnv('/mongodb')

const app = createConnection(mongoDBConfig)

module.exports = app;