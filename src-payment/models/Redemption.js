const conn = require('../app.database')
const {Redemption} = require('tamz-schemas-database/schemas')

module.exports = conn.model('Redemption', Redemption)
