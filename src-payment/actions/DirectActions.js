const CheckoutActions = require('./CheckoutActions')

exports.checkout = async ({userId, planId, price}) => {
    if (!userId || !planId || !price) return false

    const meta = {}

    const bill = await CheckoutActions.createBill({
        userId,
        planId,
        meta,
        method: 'direct',
    })

    const billId = bill.get('_id')
    await CheckoutActions.completeBill(billId)

    return await CheckoutActions.createMembership({
        userId,
        billId,
        canCancel: false
    })
}
