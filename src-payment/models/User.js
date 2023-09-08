const conn = require('../app.database')
const {User} = require('tamz-schemas-database/schemas')

User.methods.toJSON = function () {
    const object = this.toObject()

    delete object['password']
    delete object['__v']

    return object
}

module.exports = conn.model('User', User)
