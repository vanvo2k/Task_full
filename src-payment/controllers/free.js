const FreeActions = require('../actions/FreeActions')
const authHelpers = require('tamz-middleware/helpers/auth')
const {sendSuccess, sendError} = require('../helpers/response')

exports.checkout = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)

    const defaultArgs = {
        planId: '',
    }

    const {planId} = Object.assign({}, defaultArgs, req.body)

    FreeActions.checkout({userId, planId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.canSignUpTrialPlan = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)

    FreeActions.canSignUpTrialPlan({userId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}
