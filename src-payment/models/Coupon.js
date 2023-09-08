const conn = require('../app.database')
const {Coupon} = require('tamz-schemas-database/schemas')

module.exports = conn.model('Coupon', Coupon)
