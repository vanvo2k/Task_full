const Confidence = require('confidence')

const data = {
    port: {
        $filter: 'env',
        $default: 5566,
        staging: 5567,
        _production: 5566,
        production: process.env.PORT || 5566,
    },

    secretKey: {
        $filter: 'env',
        $default: '_tamz_',
        staging: '_tamz_',
        _production: '_tamz_',
        production: '_tamz_',
        productionBK: '_tamz_',
    },

    mongodb: {
        $filter: "env",
        $default: `mongodb://root:${encodeURIComponent('5~sJYae>kfvQC_Pg')}@185.193.17.44:27017/spyamz_dev?authSource=admin`,
        staging: process.env.MONGODB_URI || `mongodb://root:${encodeURIComponent('5~sJYae>kfvQC_Pg')}@localhost:27017/spyamz_dev?authSource=admin`,
        _production: 'mongodb://teeamz:gNS75pZWjxGfXsyN@172.22.30.122:27017/teeamz_app',
        production: 'mongodb://teeamz:gNS75pZWjxGfXsyN@172.22.30.122:27017/teeamz_app',
        productionBK: 'mongodb://teeamz:gNS75pZWjxGfXsyN@172.22.30.122:27017/teeamz_app',
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
            url: "nats://172.22.30.122:4222",
            json: true,
        },
        production: {
            url: "nats://172.22.30.122:4222",
            json: true,
            user: 'spyamz',
            pass: 'AWwAahyzYmDo1DduGKco6hbJ3e1eE14P'
        },
        productionBK: {
            url: "nats://172.22.30.122:4222",
            json: true,
            user: 'spyamz',
            pass: 'AWwAahyzYmDo1DduGKco6hbJ3e1eE14P'
        }
    },

    redisAuth: {
        $filter: "env",
        $default: {
            host: '127.0.0.1',
            port: 6379,
            db: 4
        },
        staging: {
            password: 's74DvupHb7wxYxS8',
            host: '127.0.0.1',
            port: 6379,
            db: 4
        },
        production: {
            password: 'QWfQnSz2TGfPP9KSetnJ37RypReyAdxX',
            host: '172.22.17.93',
            port: 6379,
            db: 4
        },
        productionBK: {
            password: 'QWfQnSz2TGfPP9KSetnJ37RypReyAdxX',
            host: '172.22.17.93',
            port: 6379,
            db: 4
        }
    },
}

const store = new Confidence.Store(data)
const criteria = {
    env: process.env.NODE_ENV || 'development'
}

module.exports = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue
};