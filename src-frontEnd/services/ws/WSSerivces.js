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

    _io = SocketIO(`${host}/api`, {
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

const timeoutDefault = 10000

export const makeRequest = (key, args, options = {}) => {
    const timeout = options.timeout ? parseInt(options.timeout, 10) : timeoutDefault
    const io = _getSocket()

    return new Promise((resolve, reject) => {
        let isFulfilled = false

        io.emit && io.emit(key, o(args), (result) => {
            if (isFulfilled) {
                return
            }

            isFulfilled = true

            return resolve(result)
        })

        setTimeout(() => {
            if (isFulfilled) {
                return
            }

            isFulfilled = true
            const error = new Error('Request timed out.')

            return reject(error)
        }, timeout)
    })
}
