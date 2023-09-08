const SocketIO = require('socket.io');
const http = require('http');
const getEnv = require('./helpers/getEnv');

/**
 * HTTP Server
 */
const server = http.createServer();

/**
 * Init socket.io
 */
const io = SocketIO(server, {
    path: '/spyamz',
    transports: ['polling', 'websocket'],
    pingInterval: 30000,
    pingTimeout: 10000,
    serveClient: false,
    cookie: false
});

const oauth = require('./controllers/oauth');
const appAPI = require('./app.api');
const appRoot = require('./app.root');

/**
 * APIs.
 */
const apiNamespace = io.of('/api');
apiNamespace.use(oauth.isAuthorized);//Authorization.
apiNamespace.on('connection', appAPI.onConnection);

/**
 * Root chanel
 */
const rootNamespace = io.of('/');
rootNamespace.use(oauth.isAuthorized);
rootNamespace.on('connection', appRoot.onConnection);
appRoot.subscribe(rootNamespace);



const port = getEnv('/port');
server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});