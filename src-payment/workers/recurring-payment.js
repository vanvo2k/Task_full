const queue = require('../app.queue')
const {RECURRING_PAYMENT} = require('../constants/Payments')
const RecurringActions = require('../actions/RecurringActions')

exports.run = () => {
    queue.process(RECURRING_PAYMENT, (job, done) => {
        const {data} = job

        const {recurringId} = data
        RecurringActions.recurringPayment(recurringId)
            .then((result) => {
                done(null, result)
            })
            .catch(error => {
                done(error, recurringId)
            })
    })
}
