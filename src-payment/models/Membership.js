const Moment = require('moment')
const conn = require('../app.database')
const {Membership} = require('tamz-schemas-database/schemas')

Membership.methods.isExpired = function (delayDays = 0) {
    const finish = this.get('finish')
    const momentFinish = Moment(finish).add(delayDays, 'days')
    const tomorrow = Moment()

    return tomorrow.isAfter(momentFinish)
}

Membership.methods.toJSON = function () {
    const object = this.toObject()

    return Object.assign({}, object, {
        isExpired: this.isExpired()
    })
}

module.exports = conn.model('Membership', Membership)
