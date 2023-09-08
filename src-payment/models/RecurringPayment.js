const conn = require('../app.database')
const {RecurringPayment} = require('tamz-schemas-database/schemas')

module.exports = conn.model('RecurringPayment', RecurringPayment)
