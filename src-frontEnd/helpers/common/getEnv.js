const config = {
    domain: {
        $default: 'localhost',
        staging: 'spyamz.com',
        production: 'spyamz.com'
    },
    baseUrl: {
        $default: 'https://localhost:3000',
        staging: 'https://dev-merch.spyamz.com',
        production: 'https://merch.spyamz.com',
    },
    baseAPIUrl: {
        $default: '/api',
        staging: '/api',
        production: '/api',
    },
    hostAPI: {
        $default: 'http://localhost:6978',
        staging: 'https://dev-merch.spyamz.com/api',
        production: 'https://prod.spyamzservices.com',
    },
    realtimeServices: {
        $default: 'http://localhost:4466',
        staging: 'https://dev-merch.spyamz.com/realtime',
        production: 'https://prod-r.spyamzservices.com'
    },
    baseAdminUrl: {
        $default: 'http://localhost:3001',
        staging: 'https://dev-admin.spyamz.com',
        production: 'https://admin.spyamz.com',
    },
    baseAdminAPI: {
        $default: 'https://dev-admin.spyamzservices.com',
        staging: 'https://dev-admin.spyamzservices.com',
        production: 'https://admin.spyamzservices.com',
    },
    basePaymentAPI: {
        $default: 'http://localhost:4242',
        staging: 'https://dev-merch.spyamz.com/payment',
        production: 'https://prod.spyamzservices.com/payment',
    },
    baseTrackingAPI: {
        $default: 'http://localhost:5123',
        staging: 'https://dev.spyamzservices.com/tracking',
        production: 'https://prod.spyamzservices.com/tracking',
    },
    baseAuthAPI: {
        $default: 'http://localhost:5566',
        staging: 'https://dev-merch.spyamz.com/auth',
        production: 'https://prod.spyamzservices.com/authentication',
    },
    baseAffiliateAPI:{
        $default: 'https://dev.spyamzservices.com/affiliate',
        staging: 'https://dev.spyamzservices.com/affiliate',
        production: 'https://prod.spyamzservices.com/affiliate',
    },
    filesUrl: {
        $default: 'https://dev-files.spyamz.com',
        staging: 'https://dev-files.spyamz.com',
        production: 'https://files.spyamz.com',
    },
    graphql: {
        $default: 'http://localhost:3000/api/graphql',
        staging: 'https://dev-merch.spyamz.com/api/graphql',
        production: 'https://merch.spyamz.com/api/graphql',
    },
    stripePublicKey: {
        $default: 'pk_test_QyTOlQCBIM7vIoUvDGWRbruM',
        staging: 'pk_test_QyTOlQCBIM7vIoUvDGWRbruM',
        production: 'pk_live_RQxnRahQebnthVQIju5yFnAn',
    },
    onesignal: {
        $default: "882f300e-14c0-4093-9fa9-9df24f6e7c16",
        staging: "18196b15-2083-43a1-8503-c43caf1d1198",
        production: "18196b15-2083-43a1-8503-c43caf1d1198",
    },
    passportAuthentication: {
        $default: `http://localhost:6978`,
        staging: 'https://dev-merch.spyamz.com/api',
        production: `https://prod.spyamzservices.com/app`,
    }
};

const _getEnvironment = () => {
    return process.env.REACT_APP_ENV || 'development';
};

export default (key, defaultValue = null) => {
    if (!config.hasOwnProperty(key)) {
        return defaultValue;
    }

    const env = _getEnvironment();
    const _dataConfig = config[key];

    return _dataConfig[env] ? _dataConfig[env] : _dataConfig['$default'] || defaultValue;
};
