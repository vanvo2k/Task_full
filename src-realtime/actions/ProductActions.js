const NATS = require('nats');
const Transporter = require('../services/TransportServices').transporter;

const prefix = process.env.NODE_ENV === 'staging' ? 'spyamz_dev' : 'spyamz';

exports.searchProducts = (args) => {
    return new Promise((resolve, reject) => {
        Transporter.requestOne(`${prefix}.SEARCH_PRODUCTS`, args, {}, 30000, (response) => {
            if (response instanceof NATS.NatsError && response.code === NATS.REQ_TIMEOUT) {
                return reject(new Error('Request timed out.'));
            }

            const {error} = response;
            if (error) {
                return reject(error);
            }

            return resolve(response);
        });
    });
};