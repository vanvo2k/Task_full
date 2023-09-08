const BillActions = require('../actions/BillActions')
const {sendSuccess, sendError} = require("../helpers/response")
const authHelpers = require('tamz-middleware/helpers/auth')
const stream = require('stream')

exports.getListBills = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)

    BillActions.getListBills(userId)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getListBillsByUser = (req, res) => {
    const userId = req.params['id'] || ''

    BillActions.getListBills(userId)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getListBillsAll = (req, res) => {
    const defaultArgs = {
        page: 1,
        limit: 10
    }

    const {page, limit} = Object.assign({}, defaultArgs, req.query)

    BillActions.getListBillsAll({page, limit})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.exportAffiliate = (req, res) => {
    const userId = authHelpers.authenticatedUserId(req)
    BillActions.exportAffiliate({userId})
        .then((data) => {
            const fileContents = Buffer.from(data, 'utf-8')

            const bufferStream = new stream.PassThrough()
            bufferStream.end(fileContents)
            
            res.set('Content-disposition', 'attachment; filename=affiliate.csv')
            res.set('Content-Type', 'text/csv')
            bufferStream.pipe(res)
        })
        .catch(sendError(req, res))
}

exports.getListAffiliatesByUser = (req, res) => {
  const userId = authHelpers.authenticatedUserId(req);
  const defaultArgs = {
    page: 1,
    limit: 10,
  };

  const { page, limit } = Object.assign({}, defaultArgs, req.query);

  BillActions.getListAffiliates({ userId, page, limit })
    .then((data) => {
      res.json(data);
    })
    .catch(sendError(req, res));
};
