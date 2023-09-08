const Bill = require('../models/Bill')
const ElasticServices = require('../services/ElasticServices')

exports.log = billId => {
    return Bill.findOne({
        _id: billId,
        status: 'completed'
    }).then(bill => {
        if (!bill) {
            throw new Error(`No bill with id ${billId}`)
        }

        return bill
    }).then(bill => {
        const object = bill.toJSON ? bill.toJSON() : bill

        return ElasticServices.addBillToLog(object)
    })
}