const express = require('express')
const app = express()
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const logger = require('morgan')
const compression = require('compression')
const cors = require('cors')

const getEnv = require('./helpers/getEnv')

/**
 * Express configuration.
 */
app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(logger('dev'))
app.use(errorHandler())

/**
 * App services.
 */
require('./app.services')

/**
 * Schedulers.
 */
require('./app.scheduler')()

/**
 * Routes.
 */
app.use(require('./app.routes'))


/**
 * Start Express server.
 */
const server = require('http').createServer(app)
const port = getEnv('/port')
server.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
