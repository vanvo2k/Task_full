const Redemption = require('../models/Redemption')
const Coupon = require('../models/Coupon')
const Moment = require('moment')
const {throwErrorWithCode} = require("../helpers/common")

const _checkCouponCodeAvailable = ({code, userId, bothPrivate = false}) => {
    const queries = {
        code,
        public: true
    }

    if (bothPrivate) {
        delete queries.public
    }

    return Coupon
        .findOne(queries)
        .then(coupon => {
            if (!coupon) {
                throw new Error('Coupon code not found.')
            }

            return Promise.resolve(coupon)
        })
        .then(coupon => {
            return Redemption.count({
                owner: userId,
                code,
                status: 'completed'
            }).then(totalUserRedemptions => {
                return Promise.resolve([coupon, totalUserRedemptions])
            })
        })
        .then(([coupon, totalUserRedemptions]) => {
            const object = coupon.toObject()

            const defaultArgs = {
                total_redemptions: 0,
                max_redemptions: -1,
                amount_off: 0,
                percent_off: 0,
                duration: 'once',
                duration_in_months: 0,
                status: 'active',
                totalUserRedemptions: parseInt(totalUserRedemptions, 10) || 0
            }

            const args = Object.assign({}, defaultArgs, object)

            return Promise.resolve(args)
        })
        .then(args => {
            const {duration, totalUserRedemptions} = args

            //Always allow for the user used coupon and duration is forever.
            if (duration === 'forever' && totalUserRedemptions && totalUserRedemptions > 0) {
                return Promise.reject({skip: true})
            }

            return Promise.resolve(args)
        })
        .then(args => {
            const status = args.status || 'active'

            if (status === 'inactive') {
                return throwErrorWithCode('Coupon has been stopped. Please try another coupon!', 'status')
            }

            return Promise.resolve(args)
        })
        .then(args => {//Check limit total redemptions
            const total_redemptions = parseInt(args.total_redemptions, 10)
            const max_redemptions = parseInt(args.max_redemptions, 10)
            const {totalUserRedemptions, duration, duration_in_months} = args

            if (duration === 'forever' && totalUserRedemptions > 0) {
                return Promise.resolve(args)
            }

            if (duration === 'repeating' && totalUserRedemptions > 0) {
                if (totalUserRedemptions >= duration_in_months) {
                    return throwErrorWithCode(`Coupon has reached the usage limit (${duration_in_months} months).`, 'usage_limit')
                }

                return Promise.resolve(args)
            }

            if (total_redemptions >= max_redemptions && max_redemptions > 0) {
                return throwErrorWithCode(`Coupon has reached the usage limit (${max_redemptions}).`, 'usage_limit')
            }

            return Promise.resolve(args)
        })
        .then(args => {//Check expired.
            const {expired_at, totalUserRedemptions, duration, duration_in_months} = args

            if (duration === 'forever' && totalUserRedemptions > 0) {
                return Promise.resolve(args)
            }

            if (duration === 'repeating' && totalUserRedemptions > 0) {
                if (totalUserRedemptions >= duration_in_months) {
                    return throwErrorWithCode(`Coupon has reached the usage limit (${duration_in_months} months).`, 'usage_limit')
                }

                return Promise.resolve(args)
            }

            if (expired_at) {
                const expiredAtMoment = Moment(expired_at)
                const momentNow = Moment()
                const isExpired = expiredAtMoment.isBefore(momentNow)
                const expirationTime = expiredAtMoment.format('dddd, MMMM Do YYYY, h:mm:ss a')

                if (isExpired) {
                    return throwErrorWithCode(`Coupon is expired (${expirationTime}).`, 'expired')
                }
            }

            return Promise.resolve(args)
        })
        .then(args => { //Check used coupon code.
            const maxRedemptionsPerUser = args.maxRedemptionsPerUser || 0
            const max = maxRedemptionsPerUser ? parseInt(maxRedemptionsPerUser, 10) : 0

            const {totalUserRedemptions, duration, duration_in_months} = args

            if (duration === 'forever' && totalUserRedemptions > 0) {
                return Promise.resolve(args)
            }

            if (duration === 'repeating' && totalUserRedemptions > 0) {
                if (totalUserRedemptions >= duration_in_months) {
                    return throwErrorWithCode(`Coupon has reached the usage limit (${duration_in_months} months).`, 'usage_limit')
                }

                return Promise.resolve(args)
            }

            if (max > 0 && totalUserRedemptions >= max) {
                return throwErrorWithCode('Coupon has reached the usage limit.', 'usage_limit')
            }

            return Promise.resolve(args)
        })
        .then(args => {
            return Promise.resolve(true)
        })
        .catch(error => {
            if (error && error.skip === true) {
                return Promise.resolve(true)
            }

            return Promise.reject(error)
        })
}

exports.addRedemption = ({userId, planId, billId, total, discount, code, metadata = {}}) => {
    const redemption = new Redemption({
        owner: userId,
        plan: planId,
        bill: billId,
        total,
        discount,
        code,
        metadata
    })

    return redemption.save()
        .then((red) => {
            return Promise.resolve(red)
        })
}

exports.completedRedemption = ({billId, couponCode}) => {
    return Redemption.updateOne(
        {
            bill: billId,
            code: couponCode,
        },
        {
            $set: {
                status: 'completed',
                updated: Date.now(),
            }
        }
    ).then(() => {
        return Redemption.findOne({
            bill: billId,
            code: couponCode
        }).then(redemption => {
            if (redemption) {

                /**
                 * Increase total number of redemptions
                 */
                return Coupon.findOne({
                    code: couponCode
                }).then(coupon => {
                    if (coupon) {
                        const currentTotal = coupon.get('total_redemptions') || 0
                        const totalValidated = currentTotal ? parseInt(currentTotal, 10) : 0

                        return coupon.update({
                            $set: {
                                total_redemptions: totalValidated + 1
                            }
                        })
                    }
                }).then(() => {
                    return Promise.resolve(redemption)
                })
            }

            return Promise.resolve(redemption)
        })
    })
}

exports.checkDiscountAvailable = ({code, userId, bothPrivate}) => {
    return _checkCouponCodeAvailable({code, userId, bothPrivate})
}

exports.getDiscount = ({total, code, userId, bothPrivate = false}) => {
    return _checkCouponCodeAvailable({code, userId, bothPrivate})
        .then((available) => {
            return Coupon.findOne({code})
        })
        .then(coupon => {
            if (!coupon) {
                return Promise.resolve(0)
            }

            const object = coupon.toObject()
            const defaultArgs = {
                total_redemptions: 0,
                max_redemptions: -1,
                amount_off: 0,
                percent_off: 0
            }

            const args = Object.assign({}, defaultArgs, object)

            return Promise.resolve(args)
        })
        .then(args => {
            const percent_off = args.percent_off ? parseFloat(args.percent_off) : 0
            const amount_off = args.amount_off ? parseFloat(args.amount_off) : 0

            if (amount_off) {
                return Promise.resolve(amount_off)
            }

            if (percent_off) {
                const discount = total * percent_off / 100

                return Promise.resolve(discount.toFixed(2))
            }

            return Promise.resolve(0)
        })
        .catch(error => {
            return Promise.resolve(0)
        })
}
