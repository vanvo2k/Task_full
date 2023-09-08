const conn = require('../app.database')
const {StripeUser} = require('tamz-schemas-database/schemas')

module.exports = conn.model('StripeUser', StripeUser)
