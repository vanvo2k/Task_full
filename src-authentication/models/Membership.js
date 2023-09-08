const Moment = require('moment')
const conn = require('../app.database')
const Plan = require('./Plan')
const {Membership} = require('tamz-schemas-database/schemas')

Membership.methods.isExpired = function (delayDays = 0) {
    const finish = this.get('finish')
    const momentFinish = Moment(finish).add(delayDays, 'days')
    const tomorrow = Moment()

    return tomorrow.isAfter(momentFinish)
}

Membership.methods.getScopes = function () {
    const planId = this.get('plan')
    const isExpired = this.isExpired(1)

    if (isExpired) {
        return Promise.resolve([])
    }

    return Plan.findById(planId)
        .then(plan => {
            if (!plan) {
                return Promise.resolve([])
            }

            return plan.getCapabilities()
        })
}

module.exports = conn.model('Membership', Membership);