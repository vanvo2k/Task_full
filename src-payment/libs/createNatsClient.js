const NATS = require('nats')

module.exports = (args) => {
    const client = NATS.connect(args)

    client.on('connect', () => {
        console.log('NATS connected.')
    })

    return client
}
