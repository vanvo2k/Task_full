const conn = require('../app.database')
const {Bill} = require('tamz-schemas-database/schemas')

module.exports = conn.model('Bill', Bill)
