const PlanActions = require('../actions/PlanActions')
const authHelpers = require('tamz-middleware/helpers/auth')
const {sendSuccess, sendError} = require('../helpers/response')

exports.getPlans = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)
    const userRoles = authHelpers.getUserRoles(req)
    const isAdmin = Array.isArray(userRoles) && userRoles.indexOf('admin') !== -1

    PlanActions.getActivePlans({userId, isAdmin})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getPlanDetail = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)
    const userRoles = authHelpers.getUserRoles(req)
    const isAdmin = Array.isArray(userRoles) && userRoles.indexOf('admin') !== -1
    const planId = req.params.planId || null

    const coupon = req.query.coupon || ''

    PlanActions.getPlanDetail({planId, userId, isAdmin, coupon})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}
