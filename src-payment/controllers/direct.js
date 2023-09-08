const DirectActions = require('../actions/DirectActions')
const {sendSuccess, sendError} = require("../helpers/response")

exports.checkout = (req, res) => {
    const defaultArgs = {
        userId: '',
        price: 0,
        planId: '5b963e2bdbb463b366995b1a'
    }

    const {userId, price, planId} = Object.assign({}, defaultArgs, req.body)

    DirectActions.checkout({userId, planId, price})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}
