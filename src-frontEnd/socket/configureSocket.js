import io from "socket.io-client";
import StorageService from "../services/StorageServices";

const socket = io('/', {
    path: '/api/socket__'
});

export const emitAuth = (key, value) => {
    const token = StorageService.get('access_token');

    socket.emit(key, {auth: token, value});
};

export default socket;