const productCtrl = require('./controllers/product');

const _bindSocket = (func, socket) => (req, res) => {
    return func(req, res, socket);
};
const _isAuthenticated = socket => func => {
    const {authenticated} = socket.handshake;

    if (!authenticated) {
        return () => {
        };
    }

    return _bindSocket(func, socket);
};


exports.onConnection = (socket) => {
    console.log('The connection connected');

    socket.on('/sp_', _isAuthenticated(socket)(productCtrl.search));
};