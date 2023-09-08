const ProductActions = require('../actions/ProductActions');
const sDecode = require("../helpers/sDecode");

exports.search = (payload, reply, socket) => {
    const {userId} = socket.handshake;
    console.log('user', userId);

    const payloadDecode = sDecode(payload);

    const dataDefault = {
        page: 1,
        limit: 48,
        query: {},
        status: 'alive',
        rank: {
            from: 1,
            to: ''
        },
        price: {
            from: 0,
            to: 0
        },
        availableText: {
            from: null,
            to: null
        },
        sortBy: {
            field: 'rank'
        },
        type: 'all',
        brandType: 'all',
        category: 'clothing'
    };

    const start = Date.now();
    const argsValidated = Object.assign(dataDefault, payloadDecode, {user: userId}, {limit: 48});

    console.log("SEARCH_PRODUCTS", argsValidated);

    ProductActions.searchProducts(argsValidated)
        .then(result => {
            console.log('SEARCH', Date.now() - start);

            reply({
                success: true,
                data: result
            });
        })
        .catch(error => {
            console.error(error);

            reply({
                success: false,
                message: error.message || error
            });
        });
};