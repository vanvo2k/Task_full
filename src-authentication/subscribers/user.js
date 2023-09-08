const UserActions = require('../actions/UserActions')
const {USER_CHANGE_MEMBERSHIP, USER_CHANGE_SCOPES} = require('spyamz-constants').events

exports.userChangeMembership = userId => {
    console.log(USER_CHANGE_MEMBERSHIP, userId)

    if (userId) {
        UserActions.flushCache(userId)
    }
}

exports.userChangeScopes = userId => {
    console.log(USER_CHANGE_SCOPES, userId)

    if (userId) {
        UserActions.flushCache(userId)
    }
};