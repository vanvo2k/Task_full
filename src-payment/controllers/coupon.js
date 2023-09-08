const CouponActions = require('../actions/CouponActions')
const authHelpers = require('tamz-middleware/helpers/auth')
const {sendSuccess, sendError} = require('../helpers/response')
const TapfiliateServices = require('../services/TapfiliateServices')

exports.available = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)

    CouponActions.isAvailable({userId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.availableV2 = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)
    const defaultArgs = {
        method: 'stripe'
    }

    const args = Object.assign({}, defaultArgs, req.body)

    CouponActions.isAvailableV2({userId, args})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getTapfiliateCouponCode = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)
    const vid = TapfiliateServices.getTapVisitorID(req)

    CouponActions.getTapfiliateCouponCode({userId, vid})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.apply = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)
    const vid = TapfiliateServices.getTapVisitorID(req)

    const defaultArgs = {
        code: '',
        planId: '',
        method: 'stripe'
    }

    const {code, planId, method} = Object.assign({}, defaultArgs, req.body)
    const bothPrivate = !!vid

    CouponActions
        .applyCoupon({
            userId,
            planId,
            code: (code + '').trim(),
            method,
            bothPrivate
        })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}


exports.getTotalUserUsedCouponCode = (req, res) => {
    const defaultArgs = {
        code: ''
    }

    const {code} = Object.assign({}, defaultArgs, req.query)

    CouponActions.getTotalUsersUsedCoupon(code)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}
