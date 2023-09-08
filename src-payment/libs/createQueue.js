const kue = require('kue')

module.exports = (options = {}) => {
    return kue.createQueue(options)
}
