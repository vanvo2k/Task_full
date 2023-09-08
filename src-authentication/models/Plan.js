const conn = require('../app.database')

const {Plan} = require('tamz-schemas-database/schemas')

Plan.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.capabilities

    return obj
}

Plan.methods.isFree = function () {
    const price = parseFloat(this.get('price'))

    return price <= 0
}

Plan.methods.getCapabilities = function () {
    const capabilities = this.get('capabilities') || []

    return Promise.resolve(capabilities)
}

module.exports = conn.model('Plan', Plan);