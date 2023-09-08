const PayPalActions = require('../actions/PayPalActions')
const authHelpers = require('tamz-middleware/helpers/auth')
const {sendSuccess, sendError} = require('../helpers/response')
const queryString = require('querystring')
const AffiliateServices = require('../services/AffiliateServices')

exports.checkout = (req, res) => {
    const ref_id = AffiliateServices.getRefId(req)
    const userId = authHelpers.authenticatedUserId(req)
    const defaultArgs = {
        planId: '',
        coupon: ''
    }

    const {planId, coupon} = Object.assign({}, defaultArgs, req.body)

    PayPalActions.checkout({userId, planId, coupon, ref_id})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.log = (req, res, next) => {
    console.log(`[PAYPAL][${new Date()}]`, JSON.stringify(req.body))

    next()
}

exports.validateIPN = (req, res, next) => {
    const formUrlEncodedBody = queryString.stringify(req.body)
    const verificationBody = `cmd=_notify-validate&${formUrlEncodedBody}`

    console.log('[PAYPAL_IPN]', verificationBody)

    PayPalActions.validateIPN(verificationBody)
        .then(() => {
            next()
        })
        .catch((error) => {
            console.error(error)
            const message = error.message || ''

            console.error('[PAYPAL_IPN]', message)

            res.status(403).send(message)
        })
}

exports.validateBilling = (req, res, next) => {
    const {custom, item_number} = req.body
    const billId = item_number || custom.billId || false

    PayPalActions.validateBilling(billId)
        .then(() => {
            req.billIdValidated = billId
            return next()
        })
        .catch(error => {
            console.error(error)

            return res.status(500).send(error.message || '')
        })
}

exports.ipn = (req, res) => {
    const {billIdValidated} = req
    const postData = req.body

    PayPalActions.ipn({postData, billId: billIdValidated})
        .then(message => {
            res.send(message)
        })
        .catch(error => {
            res.send(error.message || '')
        })
}

exports.testIPN = (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(404)
    }

    const billId = req.body.bill || false
    const postData = req.body

    PayPalActions.testIPN({postData, billId})
        .then(message => {
            res.send(message)
        })
        .catch(error => {
            console.error(error)

            res.status(500).send(error.message || '')
        })
}
