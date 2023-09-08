const getEnv = require('../helpers/getEnv')
const createNatsClient = require('../libs/createNatsClient')
const natsConfig = getEnv('/nats')

const nats = createNatsClient(natsConfig)
const prefix = process.env.NODE_ENV === 'staging' ? 'spyamz_dev' : 'spyamz'

exports.transporter = nats

exports.PREFIX = prefix
