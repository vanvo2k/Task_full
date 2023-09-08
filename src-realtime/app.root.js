const {transporter, PREFIX} = require('./services/TransportServices');
const {USER_CHANGE_MEMBERSHIP, USER_CHANGE_SCOPES, AUTH_CREATE_NEW_SESSION_SUCCESS} = require('spyamz-constants').events;

const userSubscriber = require('./subscribers/user');
const trademarkSubscriber = require('./subscribers/trademark');
const affiliateSubscriber = require('./subscribers/affiliate');

exports.subscribe = (io) => {
    setInterval(() => {
        io.clients((error, clients) => {
            if (error) return;

            console.log("Connections:", clients.length);
        });
    }, 5000);

    transporter.subscribe(`${PREFIX}.pusher`, {queue: 'pusher-services'}, (data) => {
        const {channel, event, payload} = data;

        if (!channel || !event) {
            return;
        }

        io.to(channel).emit(event, payload);
    });

    transporter.subscribe(`${PREFIX}.${USER_CHANGE_MEMBERSHIP}`, {queue: 'realtime-services'}, userSubscriber.userChangeMembership(io));
    transporter.subscribe(`${PREFIX}.${USER_CHANGE_SCOPES}`, {queue: 'realtime-services'}, userSubscriber.userChangeScopes(io));
    transporter.subscribe(`${PREFIX}.${AUTH_CREATE_NEW_SESSION_SUCCESS}`, {queue: 'realtime-services'}, userSubscriber.newSession(io));
    transporter.subscribe(`${PREFIX}.TRADEMARK_UPDATED`, {queue: 'realtime-services'}, trademarkSubscriber.trademarkUpdated(io));
    transporter.subscribe(`${PREFIX}.AFFILIATE_REGISTRATION_CONFIRMED`, {queue: 'realtime-services'}, affiliateSubscriber.registrationConfirmed(io));
    transporter.subscribe(`${PREFIX}.AFFILIATE_STATISTICS_CHANGED`, {queue: 'realtime-services'}, affiliateSubscriber.affiliateStatisticsChanged(io));
};

exports.onConnection = (socket) => {
    const {userId, authenticated} = socket.handshake;

    if (!authenticated) {
        socket.disconnect();
        return;
    }

    socket.on('disconnect', reason => {
        console.log('Socket disconnected.', userId, reason);
    });

    console.log('New root connection', userId);

    socket.join('all');
    socket.join(`user@${userId}`);
};