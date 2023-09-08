const Confidence = require('confidence')

const data = {
    port: {
        $filter: 'env',
        $default: 4242,
        staging: 4243,
        production: 4242
    },
    webClient: {
        $filter: "env",
        $default: 'http://localhost:3000',
        staging: 'https://dev-merch.spyamz.com',
        production: 'https://merch.spyamz.com',
    },
    host: {
        $filter: "env",
        $default: 'http://localhost:3000/api',
        staging: 'https://dev-merch.spyamz.com/payment',
        production: 'https://payment-services.spyamz.com',
    },
    stripe: {
        secretKey: {
            $filter: "env",
            $default: 'sk_test_2f4RtbnsgLDFnhRo29FFWNRF',
            staging: 'sk_test_2f4RtbnsgLDFnhRo29FFWNRF',
            production: 'sk_live_5wRTu8CoOqA5azgluMpzN87i',
        },
        webHookSecret: {
            $filter: "env",
            $default: 'whsec_w6Xft2qNLN8EbKLdHefz3VAB2Aqi20Kz',
            staging: 'whsec_w6Xft2qNLN8EbKLdHefz3VAB2Aqi20Kz',
            production: 'whsec_TXgcgpxFfRDVykLiml5cqvvMOeb5bvO0',
        }
    },
    mongodb: {
        $filter: "env",
        $default: `mongodb://root:${encodeURIComponent('5~sJYae>kfvQC_Pg')}@185.193.17.44:27017/spyamz_dev?authSource=admin`,
        staging: process.env.MONGODB_URI || `mongodb://root:${encodeURIComponent('5~sJYae>kfvQC_Pg')}@localhost:27017/spyamz_dev?authSource=admin`, //'mongodb://teeamz_test:gNS75pZWjxGfXsyN@localhost:27017/teeamz_app_test',
        _production: 'mongodb://teeamz:gNS75pZWjxGfXsyN@172.22.30.122:27017/teeamz_app',
        production: 'mongodb://teeamz:gNS75pZWjxGfXsyN@localhost:27017/teeamz_app',
    },
    elasticSearch: {
        $filter: "env",
        // $default: process.env.ELASTICSEARCH_URI || 'http://localhost:9200',
        $default: "https://spy126:EUaNXfPke3h99AZB@elasticsearch.spy126.com",
        staging: process.env.ELASTICSEARCH_URI || 'http://elastic:QwGknzkgn4Jyjhc8@127.0.0.1:9200',
        _production: "https://spy126:EUaNXfPke3h99AZB@elasticsearch.spy126.com",
        production: 'http://157.230.56.93:9200',
    },
    billIndexing: {
        $filter: "env",
        $default: {
            index: 'tamz_billing',
            type: 'items'
        },
        staging: {
            index: 'tamz_billing_dev',
            type: 'items'
        },
        _production: {
            index: 'tamz_billing',
            type: 'items'
        },
        production: {
            index: 'tamz_billing',
            type: 'items'
        },
    },
    PayPal: {
        $filter: "env",
        $default: {
            endpoint: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
            receiver: 'tutv95-facilitator@gmail.com',
            return_: '/settings/billing',
            cancel_return: '/settings/billing',
            notify_url: '/paypal/ipn',
            ipn_endpoint: 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr'
        },
        staging: {
            endpoint: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
            receiver: 'tutv95-facilitator@gmail.com',
            return_: '/settings/billing',
            cancel_return: '/settings/billing',
            notify_url: '/paypal/ipn',
            ipn_endpoint: 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr'
        },
        production: {
            endpoint: 'https://www.paypal.com/cgi-bin/webscr',
            receiver: 'sales@foobla.com',
            return_: '/settings/billing',
            cancel_return: '/settings/billing',
            notify_url: '/paypal/ipn',
            ipn_endpoint: 'https://ipnpb.paypal.com/cgi-bin/webscr',
        }
    },
    redisQueue: {
        $filter: "env",
        $default: {
            host: '127.0.0.1',
            port: 6379,
            db: 12
        },
        staging: {
            password: 's74DvupHb7wxYxS8',
            host: '127.0.0.1',
            port: 6379,
            db: 10,
        },
        production: {
            auth: 'QWfQnSz2TGfPP9KSetnJ37RypReyAdxX',
            host: '172.22.17.93',
            port: 6379,
            db: 12
        }
    },
    tapfiliate: {
        $filter: "env",
        $default: {
            apiKey: "1f2ba991bbbd6e48e6cc73636a4b05edd1901b21"
        },
        staging: {
            apiKey: "1f2ba991bbbd6e48e6cc73636a4b05edd1901b21"
        },
        production: {
            apiKey: "1f2ba991bbbd6e48e6cc73636a4b05edd1901b21"
        }
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
}

const store = new Confidence.Store(data)
const criteria = {
    env: process.env.NODE_ENV || 'development'
}

module.exports = (key, defaultValue = null) => {
    return store.get(key, criteria) || defaultValue
}

