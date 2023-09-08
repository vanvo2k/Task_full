const createClient = require('../libs/createElasticSearch')
const client = createClient()
const getEnv = require('../helpers/getEnv')

const indexing = getEnv('/billIndexing')

const _findBillId = (billId) => {
    return client.get({
        index: indexing.index,
        type: indexing.type,
        id: billId
    }).catch(err => {
        return Promise.resolve(null)
    })
}

exports.addBillToLog = (bill) => {
    const {_id, method, title, owner, plan, coupon, price, created} = bill

    const doc = {
        method,
        owner,
        plan,
        title,
        coupon,
        price,
        created,
    }

    const billId = _id.toString ? _id.toString() : _id

    return _findBillId(billId)
        .then(_doc => {
            if (!_doc) {
                return client.create({
                    index: indexing.index,
                    type: indexing.type,
                    id: billId,
                    body: doc
                })
            }

            return client.update({
                index: indexing.index,
                type: indexing.type,
                id: billId,
                body: {
                    doc
                }
            })
        })
}
