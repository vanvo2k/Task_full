const elasticSearch = require('elasticsearch')
const getEnv = require('../helpers/getEnv')
const elasticSearchHost = getEnv('/elasticSearch')

module.exports = (uri = '') => {
    return new elasticSearch.Client({
        host: uri || elasticSearchHost || 'localhost:9200'
    })
}
