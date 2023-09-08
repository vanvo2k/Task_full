const Session = require('../models/Session')
const Moment = require('moment')

const _cleanExpiredSessions = () => {
    return Session.deleteMany({
        expired: {
            $lt: Date.now()
        }
    }).then(removed => {
        console.log('CLEAN_REVOKED_SESSIONS', removed)

        return Promise.resolve(true)
    }).catch(error => {
        console.error('CLEAN_SESSIONS_ERROR', error)

        throw error
    })
}

const _cleanRevokedSession = () => {
    const threeDaysAgo = Moment().subtract(7, 'days')

    return Session.deleteMany({
        status: 'revoked',
        created: {
            $lt: threeDaysAgo.valueOf()
        }
    }).then(removed => {
        console.log('CLEAN_REVOKED_SESSIONS', removed)

    }).catch(error => {
        console.error('CLEAN_REVOKED_SESSIONS_ERROR', error)

        throw error
    })
}

exports.run = () => {
    console.log('Cleaning sessions is running...')

    return Promise.all([
        _cleanRevokedSession(),
        _cleanExpiredSessions()
    ])
}
