const express = require('express')
const router = express.Router()

const getUserIP = require('./helpers/getUserIP')

const RateLimit = require('tamz-middleware/middleware/RateLimit')
const Oauth = require('tamz-middleware/middleware/Oauth')

router.all('/ping', (req, res) => res.send('auth:pong'))

/**
 * Users.
 */
const authCtrl = require('./controllers/auth')
router.post('/logout',
    RateLimit.limit({
        limit: 5,
        window: 120,
        getKey: (req, res) => {
            const IP = getUserIP(req)

            return `auth:logout:${IP}`
        }
    }),
    authCtrl.logout
)

router.post('/oauth/token',
    // RateLimit.limit({
    //     limit: 30,
    //     window: 7200,
    //     getKey: (req, res) => {
    //         const IP = getUserIP(req)

    //         return `auth:token:${IP}`
    //     }
    // }),
    authCtrl.validateRefreshToken,
    authCtrl.getToken
)

router.post('/heartbeat',
    Oauth.isAuthorizedV2({noInjectUserData: true}),
    authCtrl.validateHeartbeat,
    authCtrl.heartbeat
)

/**
 * Exports.
 */
module.exports = router
