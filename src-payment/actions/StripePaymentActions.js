const StripeUser = require('../models/StripeUser')
const StripeServices = require('../services/StripeServices')

exports.charge = ({userId, total, billId, description = ''}) => {
    return StripeUser.findOne({
        owner: userId,
    }).then(user => {
        if (!user) {
            throw new Error('Stripe user not found.')
        }

        return Promise.resolve(user)
    }).then(user => {
        const stripeUID = user.get('stripeUID')
        const totalCents = (total * 100).toFixed(0);//total * 100 = cents

        return StripeServices.charges.create({
            amount: totalCents,
            currency: "usd",
            customer: stripeUID,
            description,
            metadata: {
                billId: billId.toString() || billId
            }
        }).then(charge => {
            const {paid, id} = charge
            console.log('PAID', paid, id)

            return Promise.resolve(paid)
        })
    })
}
