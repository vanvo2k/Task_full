import SocketIO from "socket.io-client"
import AuthServices from "../AuthServices"
import getEnv from "../../helpers/common/getEnv"
import o from "../../helpers/o"

const host = getEnv('realtimeServices')

let _io = null

const _getSocket = () => {
    if (_io) {
        return _io
    }

    const accessToken = AuthServices.getAccessToken()
    const str = (accessToken + "").split('.')
        .map(t => o(t))
        .reverse()

    _io = SocketIO(`${host}/`, {
        path: '/spyamz',
        query: {
            'a': window.btoa(JSON.stringify(str))
        }
    })

    _io.on('error', (message) => {
        console.error(message)
    })

    _io.on('disconnect', () => {
        console.log('Socket is disconnected.')
    })

    _io.on('connect', () => {
        console.log('Socket is connected.')
    })

    _io.on('reconnecting', () => {
        console.log('Socket is reconnecting...')
    })

    _io.on('authenticate', () => {
        console.log('need authenticate.')

        if (!AuthServices.isAuthenticated()) {
            return
        }

        _io.close()
        _io.open()
    })

    return _io
}

export const unsubscribe = (event = '', callback) => {
    if (!event) {
        return
    }

    const io = _getSocket()
    io.removeListener(event, callback)
}

export const subscribe = (event = '', callback) => {
    if (!event) {
        return
    }

    const io = _getSocket()
    io.on(event, callback)
}
