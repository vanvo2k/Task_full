const Oauth = require("tamz-middleware/middleware/Oauth");
const base64 = require("../helpers/base64");
const sDecode = require("../helpers/sDecode");

exports.isAuthorized = (socket, next) => {
    const {'a': tokenEncoded} = socket.handshake.query;

    if (!tokenEncoded) {
        socket.emit('authenticate', true);

        return next();
    }

    try {
        const array = JSON.parse(base64.decode(tokenEncoded));
        if (!array || !Array.isArray(array) || array.length < 3) {
            socket.emit('authenticate', true);

            return next();
        }

        const arrToken = array.map(encoded => sDecode(encoded)).reverse();
        const [header, payload, signature] = arrToken;
        const token = header + "." + payload + "." + signature;

        Oauth.isAuthorizedWithToken(token)
            .then((decoded) => {
                const {id} = decoded;
                socket.handshake.userId = id;
                socket.handshake.authenticated = true;

                next();
            })
            .catch(error => {
                next(error);
            });
    } catch (e) {
        socket.emit('authenticate', true);

        return next();
    }
};