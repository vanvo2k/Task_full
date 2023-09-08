exports.getRefId = (req) => {
    return req.headers['x-spz-affiliate-id'] || req.body['spz-affiliate-id'] || req.query['spz-affiliate-id'] || ''
}
