const getEnv = require('../helpers/getEnv')
const apiKey = getEnv('/tapfiliate/apiKey')
const request = require('request-promise-native')

const _createConversion = ({visitor_id, external_id, amount, meta_data}) => {
    return Promise.resolve(true)
}

exports.createConversion = _createConversion

exports.getTapVisitorID = (req) => {
    return req.headers['x-tap-id'] || req.body['vid'] || req.query['vid'] || ''
}
