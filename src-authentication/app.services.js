const Transporter = require('./services/TransportServices').transporter
const OAuthActions = require('./actions/OAuthActions')
const UserActions = require('./actions/UserActions')
const {USER_CHANGE_MEMBERSHIP, USER_CHANGE_SCOPES} = require('spyamz-constants').events

const prefix = process.env.NODE_ENV === 'staging' ? 'spyamz_dev' : 'spyamz'

Transporter.subscribe(`${prefix}.CREATE_A_NEW_SESSION`, {queue: 'authentication-services'}, (request, reply) => {
    const args = Object.assign({}, {userId: ''}, request)

    console.log("NEW_SESSION", args)

    OAuthActions.createNewSession(args)
        .then((result) => {
            Transporter.publish(reply, {
                success: true,
                data: result
            })
        })
        .catch(error => {
            const message = typeof error === 'string' ? error : error.message || ''

            Transporter.publish(reply, {
                success: false,
                message,
            })
        })
})

Transporter.subscribe(`${prefix}.AUTH_GET_USER_SCOPES`, {queue: 'authentication-services'}, (request, reply) => {
    UserActions.getScopesByUserId(request)
        .then((result) => {
            Transporter.publish(reply, {
                success: true,
                data: result
            })
        })
        .catch(error => {
            const message = typeof error === 'string' ? error : error.message || ''

            Transporter.publish(reply, {
                success: false,
                message,
            })
        })
})

Transporter.subscribe(`${prefix}.AUTH_GET_USER_ROLES`, {queue: 'authentication-services'}, (request, reply) => {
    UserActions.getRolesByUserId(request)
        .then((result) => {
            Transporter.publish(reply, {
                success: true,
                data: result
            })
        })
        .catch(error => {
            const message = typeof error === 'string' ? error : error.message || ''

            Transporter.publish(reply, {
                success: false,
                message,
            })
        })
})

/**
 * Users.
 */
const userSubscriber = require('./subscribers/user')
Transporter.subscribe(`${prefix}.${USER_CHANGE_MEMBERSHIP}`, {queue: 'authentication-services'}, userSubscriber.userChangeMembership)
Transporter.subscribe(`${prefix}.${USER_CHANGE_SCOPES}`, {queue: 'authentication-services'}, userSubscriber.userChangeScopes)
