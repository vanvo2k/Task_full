const Coupon = require('../models/Coupon')
const Redemption = require('../models/Redemption')
const Plan = require('../models/Plan')
const RedemptionActions = require('./RedemptionActions')
const PayPalActions = require('./PayPalActions')
const isNumeric = require('../helpers/isNumeric')

exports.isAvailable = ({userId}) => {
    return Promise.resolve(true)
}

exports.isAvailableV2 = ({userId, args}) => {
    const {method, code} = args

    if (method === 'paypal') {
        if (!code) {
            return Promise.resolve(true)
        }

        return Coupon.findOne({
            code
        }).then(coupon => {
            if (!coupon) {
                throw new Error('Coupon code is unavailable for PayPal.')
            }

            const duration = coupon.get('duration')

            if (duration !== 'forever') {
                throw new Error('Coupon code is unavailable for PayPal.')
            }

            return Promise.resolve(true)
        })
    }

    return Promise.resolve(true)
}

exports.getTapfiliateCouponCode = ({userId, vid}) => {
    if (vid && typeof vid === 'string' && vid.length >= 32 && false) {
        return Promise.resolve({
            code: 'ref',
            vid,
        })
    }

    return Promise.resolve(false)
}

const _checkCouponCodeAvailableWithMethod = (code, method) => {
    if (method !== 'paypal') {
        return Promise.resolve(true)
    }

    return PayPalActions.checkCouponAvailable(code)
}

exports.applyCoupon = ({userId, planId, code, method, bothPrivate}) => {
    if (!code) {
        return Promise.reject(new Error('Coupon code is empty.'))
    }

    return _checkCouponCodeAvailableWithMethod(code, method)
        .then(available => {
            if (!available) {
                throw new Error('Coupon code is unavailable with this method.')
            }

            return RedemptionActions.checkDiscountAvailable({code, userId, bothPrivate})
        })
        .then((available) => {
            return Coupon.findOne({
                code
            })
        })
        .then(coupon => {
            if (!coupon) {
                throw new Error('Coupon code is unavailable.')
            }

            return Promise.resolve(coupon)
        })
        .then(coupon => {
            const code = coupon.get('code')
            const text = coupon.get('description')

            return Plan.findById(planId)
                .then(plan => {
                    if (!plan) {
                        throw new Error('Plan not found.')
                    }

                    const {slug} = plan
                    const couponPlans = coupon.get('plans')

                    if (!couponPlans.length && slug !== 'standard') {
                        throw new Error('Coupon code is unavailable for this plan.')
                    }

                    if (couponPlans.length && couponPlans.indexOf(plan.get('slug')) === -1) {
                        throw new Error('Coupon code is unavailable for this plan.')
                    }

                    const price = plan.get('price')

                    return RedemptionActions.getDiscount({total: price, code, userId, bothPrivate})
                        .then(discount => {
                            return Promise.resolve({
                                discount,
                                code,
                                text
                            })
                        })
                })
        })
}

exports.getTotalUsersUsedCoupon = (code) => {
    const couponCode = (code + '').trim()
    if (!couponCode) {
        return Promise.reject(new Error('Coupon code is empty'))
    }

    return Redemption.aggregate([
        {
            $match: {
                code: couponCode,
                status: 'completed'
            }
        },
        {
            $group: {
                _id: '$owner',
                count: {
                    $sum: 1
                }
            }
        },
        {
            $group: {
                _id: 1,
                count: {
                    $sum: 1
                }
            }
        }
    ]).then(results => {
        if (!results || !Array.isArray(results) || !results.length) return 0

        const result = results[0]

        return isNumeric(result.count) ? parseInt(result.count, 10) : 0
    })
}