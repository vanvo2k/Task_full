const express = require('express')
const router = express.Router()


const Role = require('tamz-middleware/middleware/Role')
const Oauth = require('tamz-middleware/middleware/Oauth')

const stripeCtrl = require('./controllers/stripe')
const planCtrl = require('./controllers/plan')
const billCtrl = require('./controllers/bill')
const gatewayCtrl = require('./controllers/gateway')
const paypalCtrl = require('./controllers/paypal')
const freeCtrl = require('./controllers/free')
const couponCtrl = require('./controllers/coupon')
const membershipCtrl = require('./controllers/membership')

/**
 * Register routes.
 */
router.all('/', (req, res) => res.send('Cheat uh?'))
router.all('/ping', (req, res) => res.send('payment:pong'))

/**
 * Gateway
 */
router.get('/gateway/available', Oauth.isAuthorized, gatewayCtrl.getAvailableGateway)

/**
 * Plan
 */
router.get('/plans', Oauth.isAuthorized, planCtrl.getPlans)
router.get('/plans/:planId', Oauth.isAuthorized, planCtrl.getPlanDetail)

/**
 * Bill
 */
router.get('/bills', Oauth.isAuthorized, billCtrl.getListBills)
router.get('/bills/all', Oauth.isAuthorized, Role.currentUserHasRole('admin'), billCtrl.getListBillsAll)
router.get('/bills/:id', Oauth.isAuthorized, Role.currentUserHasRole('admin'), billCtrl.getListBillsByUser)

/**
 * Stripe
 */
// router.get('/stripe/user', Oauth.isAuthorized, stripeCtrl.getUser)
// router.post('/stripe/user', Oauth.isAuthorized, stripeCtrl.createUser)
// router.post('/stripe/card', Oauth.isAuthorized, stripeCtrl.saveCard)
// router.delete('/stripe/card', Oauth.isAuthorized, stripeCtrl.removeCard)
// router.post('/stripe/checkout', Oauth.isAuthorized, stripeCtrl.checkout)
// router.post('/stripe/hook', stripeCtrl.webHook)

/**
 * PayPal
 */
router.post('/paypal/checkout', Oauth.isAuthorized, paypalCtrl.checkout)
router.post('/paypal/ipn', paypalCtrl.log, paypalCtrl.validateIPN, paypalCtrl.validateBilling, paypalCtrl.ipn)

/**
 * Free
 */
router.post('/free/checkout', Oauth.isAuthorized, freeCtrl.checkout)
router.get('/free/trial-available', Oauth.isAuthorized, freeCtrl.canSignUpTrialPlan)

/**
 * Coupon
 */
router.get('/coupon/available', Oauth.isAuthorized, couponCtrl.available)
router.post('/coupon/available', Oauth.isAuthorized, couponCtrl.availableV2)
router.post('/coupon/apply', Oauth.isAuthorized, couponCtrl.apply)
router.post('/coupon/tapfiliate', Oauth.isAuthorized, couponCtrl.getTapfiliateCouponCode)
router.get('/coupon/users/total', Oauth.isAuthorized, Role.currentUserHasRole('admin'), couponCtrl.getTotalUserUsedCouponCode)


/**
 * Export bill
 */
router.get('/export/affiliate', Oauth.isAuthorized, billCtrl.exportAffiliate)

/**
 * Show bill
 */
router.get("/affiliate", Oauth.isAuthorized, billCtrl.getListAffiliatesByUser);


/**
 * Membership
 */
router.get('/membership', Oauth.isAuthorized, membershipCtrl.getCurrentMembership)
router.post('/membership/cancel', Oauth.isAuthorized, membershipCtrl.cancelMembership)

/**
 * Direct method.
 */
const directCtrl = require('./controllers/direct')
router.get('/direct/checkout', Oauth.isAuthorized, Role.currentUserHasRole('admin'), directCtrl.checkout)

/**
 * Exports.
 */
module.exports = router
