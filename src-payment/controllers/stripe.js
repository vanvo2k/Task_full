const StripeActions = require('../actions/StripeActions')
const StripeWebHookActions = require('../actions/StripeWebHookActions')
const {sendSuccess, catchError, sendError} = require('../helpers/response')
const authHelpers = require('tamz-middleware/helpers/auth')
const TapfiliateServices = require('../services/TapfiliateServices')
const AffiliateServices = require('../services/AffiliateServices')

exports.getUser = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)

    StripeActions.getStripeUser({userId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.createUser = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)

    StripeActions.createStripeUser({userId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.saveCard = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)

    const defaultArgs = {
        stripeUID: '',
        token: '',
        form: {}
    }

    const {stripeUID, token, form} = Object.assign({}, defaultArgs, req.body)

    StripeActions.addCardToCustomer({userId, stripeUID, token, form})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.removeCard = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)

    const defaultArgs = {
        stripeUID: '',
        cardId: ''
    }

    const {stripeUID, cardId} = Object.assign({}, defaultArgs, req.body)

    StripeActions.removeCard({userId, cardId, stripeUID})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.checkout = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)
    const tap_vid = TapfiliateServices.getTapVisitorID(req)
    const ref_id = AffiliateServices.getRefId(req)

    const defaultArgs = {
        planId: '',
        cardId: '',
        coupon: ''
    }

    const {planId, cardId, coupon} = Object.assign({}, defaultArgs, req.body)

    StripeActions
        .checkout({
            cardId,
            userId,
            planId,
            coupon,
            tap_vid,
            ref_id
        })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.webHook = (req, res) => {
    const signature = req.headers["stripe-signature"]

    StripeWebHookActions.webHook({signature, body: req.rawBody})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res))
}
