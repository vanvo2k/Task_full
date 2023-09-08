const {transporter, PREFIX} = require('./services/TransportServices')
const NewUserActions = require('./actions/NewUserActions')
const {BILL_COMPLETED, NEW_USER_REGISTER} = require('spyamz-constants').events
const logBilling = require('./workers/logBilling')

/**
 * Subscribe event created a new user.
 */
transporter.subscribe(`${PREFIX}.${NEW_USER_REGISTER}`, {queue: 'payment-background'}, ({userId, email}) => {
    console.log('[PAYMENT]NEW USER REGISTER', userId)

    NewUserActions.registerTrialPlan(userId)
})

/**
 * A bill completed.
 */
transporter.subscribe(`${PREFIX}.${BILL_COMPLETED}`, {queue: 'payment-background'}, billId => {
    console.log('[PAYMENT]NEW BILL COMPLETED', billId)

    logBilling.log(billId)
})
