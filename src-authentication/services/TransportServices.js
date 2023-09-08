const getEnv = require('../helpers/getEnv')
const createNatsClient = require('../libs/createNatsClient')
const natsConfig = getEnv('/nats')

const prefix = process.env.NODE_ENV === 'staging' ? 'spyamz_dev' : 'spyamz'
const nats = createNatsClient(natsConfig)

exports.transporter = nats
exports.PREFIX = prefix