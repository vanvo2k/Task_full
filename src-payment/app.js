const express = require('express')
const app = express()
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const logger = require('morgan')
const compression = require('compression')
const cors = require('cors')
const robots = require('express-robots')
const timber = require('timber')
const getEnv = require('./helpers/getEnv')


/**
 * Express configuration.
 */
app.disable('x-powered-by')
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json({
    verify: function (req, res, buf) {
        const url = req.originalUrl
        if (url.startsWith('/stripe/hook') || url.startsWith('/raw/')) {
            req.rawBody = buf.toString()
        }
    }
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(errorHandler())
app.use(robots({UserAgent: '*', Disallow: '/'}))

/**
 * Config timber
 */
if (process.env.NODE_ENV === 'production') {
    const transport = new timber.transports.HTTPS('2657_b940c17e5728bfee:6aaee3ee643d064b292b423f76fbbb9bd43d51d470e24c5ef39613fe05b8798a')
    timber.install(transport)
    app.use(timber.middlewares.express())
}

/**
 * Config routes.
 */
app.use(require('./app.routes'))

/**
 * Background tasks.
 */
require('./app.background')

/**
 * Start Express server.
 */
const server = require('http').createServer(app)
const port = getEnv('/port')
server.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
