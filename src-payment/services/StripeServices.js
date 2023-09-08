const Stripe = require('stripe')
const getEnv = require('../helpers/getEnv')
const secretKey = getEnv('/stripe/secretKey')

module.exports = Stripe(secretKey)
