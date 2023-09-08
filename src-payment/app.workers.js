const recurringPayment = require('./workers/recurring-payment')

module.exports = () => {
    recurringPayment.run()
}
