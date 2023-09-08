const Confidence = require('confidence');

const data = {
    port: {
        $filter: 'env',
        $default: 4466,
        staging: 4456,
        production: 4455
    },
    natsPrefix: {
        $filter: 'env',
        $default: 'spyamz',
        staging: 'spyamz_dev',
        _production: 'spyamz',
        production: 'spyamz',
    },
    nats: {
        $filter: 'env',
        $default: {
            url: "nats://127.0.0.1:4222",
            json: true,
        },
        staging: {
            url: "nats://127.0.0.1:4222",
            json: true,
        },
        _production: {
            url: "nats://127.0.0.1:4222",
            json: true,
        },
        production: {
            url: "nats://172.22.30.122:4222",
            json: true,
            user: 'spyamz',
            pass: 'AWwAahyzYmDo1DduGKco6hbJ3e1eE14P'
        }
    },
};

const store = new Confidence.Store(data);
const criteria = {
    env: process.env.NODE_ENV || 'development'
};

module.exports = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue;
};