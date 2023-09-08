const MembershipActions = require('../actions/MembershipActions')
const {sendSuccess, sendError} = require("../helpers/response")
const authHelpers = require('tamz-middleware/helpers/auth')

exports.getCurrentMembership = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)

    MembershipActions.getCurrentMembership(userId)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.cancelMembership = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)

    MembershipActions.cancelMembership(userId)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}
