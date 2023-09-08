const GatewayActions = require('../actions/GatewayActions')
const {sendSuccess, sendError} = require("../helpers/response")
const authHelpers = require('tamz-middleware/helpers/auth')

exports.getAvailableGateway = (req, res) => {
    const version = req.body['app-version'] || req.query['app-version'] || req.headers['x-app-version'] || '1.0.0'
    const userRoles = authHelpers.getUserRoles(req)
    const isAdmin = Array.isArray(userRoles) && userRoles.indexOf('admin') !== -1

    GatewayActions.getAvailableGateway({appVersion: version, isAdmin})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}
