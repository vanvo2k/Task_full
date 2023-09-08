import axios from 'axios'
import uuid from 'uuid/v4'
import PromiseCancelable from '../helpers/common/PromiseCancelable'
import { AUTH_FAILURE } from '../constants/ActionTypes'
import { addQueryToUrl } from '../helpers/RouterHelper'
import { getStore } from './StoreServices'
import { showServerError } from '../app/server-error/actions'
import AuthService from './AuthServices'
import getEnv from '../helpers/common/getEnv'
import StorageService from './StorageServices'
import { getTapId } from './TapfiliateServices'
import { getUserLanguage } from './LocaleServices'
import getFingerPrint from '../helpers/common/getFingerPrint'
import getCookie from '../helpers/cookie/getCookie'

const _getAppVersion = () => {
    const app = StorageService.get('app')

    return app ? app.version : '1.0.0'
}

const _getRefId = () => {
    return getCookie('spz_visit_id') || ''
}

class APIServices {
    _uid = ''
    _isRefreshingToken = false
    _refreshTokenSubscribers = []

    constructor(baseURL) {
        this._baseURL = baseURL || getEnv('baseAPIUrl')
        this._baseAuthURL = getEnv('baseAuthAPI')

        this.api = axios.create({
            baseURL: this._baseURL,
            timeout: 20000,
        })

        getFingerPrint().then((uid) => {
            this._uid = uid
        })
    }

    _notifyRefreshToken = (error, accessToken) => {
        this._isRefreshingToken = false
        this._refreshTokenSubscribers.forEach((subscriber) => {
            subscriber(error, accessToken)
        })

        this._refreshTokenSubscribers = []
    }

    _subscribeNewRefreshToken = (subscriber) => {
        if (!subscriber) {
            return
        }

        if (this._refreshTokenSubscribers.indexOf(subscriber) !== -1) {
            return
        }

        this._refreshTokenSubscribers = [].concat(this._refreshTokenSubscribers, [subscriber])
    }

    _refreshAccessToken = () => {
        if (this._isRefreshingToken) {
            return new Promise((resolve, reject) => {
                const subscribe = (error, accessToken) => {
                    if (error) {
                        return reject(error)
                    }

                    return resolve(accessToken)
                }

                this._subscribeNewRefreshToken(subscribe)
            })
        }

        this._isRefreshingToken = true

        return this.makeRequest({
            url: this._baseAuthURL + '/oauth/token',
            method: 'POST',
            headers: {
                Authorization: AuthService.getAccessToken(),
                'X-Refresh-Token': AuthService.getRefreshToken(),
            },
        })
            .then((response) => {
                const { success, data, message } = response

                if (!success) {
                    throw new Error(message)
                }

                const { access_token } = data
                AuthService.setAccessToken(access_token)

                this._notifyRefreshToken(null, access_token)

                return access_token
            })
            .catch((error) => {
                this._notifyRefreshToken(error)

                throw error
            })
    }

    makeRequest(args) {
        const _headers = args.headers ? args.headers : {}

        const defaultHeaders = {
            'X-User-Language': getUserLanguage(),
            'X-App-Version': _getAppVersion(),
            'X-Tap-ID': getTapId(),
            'X-UID': this._uid,
        }

        const refId = _getRefId()
        if (refId && typeof refId === 'string') defaultHeaders['X-SPZ-Affiliate-ID'] = refId

        const source = axios.CancelToken.source()

        args = {
            ...args,
            headers: {
                ...defaultHeaders,
                ..._headers,
            },
            cancelToken: source.token,
        }

        return new PromiseCancelable((resolve, reject, onCancel) => {
            onCancel(() => {
                source.cancel()
            })

            this.api(args).then(
                (response) => resolve(response.data),
                (error) => reject(error)
            )
        })
    }

    makeAuthRequest(args, noCache = false) {
        const requestHeaders = args.headers ? args.headers : {}

        let headers = {
            Authorization: AuthService.getAccessToken(),
        }

        if (noCache) {
            //Add query no-cache to change url request
            const url = args.url || ''
            args = {
                ...args,
                url: addQueryToUrl(url, { 'no-cache': uuid() }),
            }

            // Add header no-cache
            headers = {
                ...headers,
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            }
        }

        args = {
            ...args,
            headers: {
                ...headers,
                ...requestHeaders,
            },
        }

        const request = this.makeRequest(args)
        const requestWithRetry = this._retryRequestIfExpired(request, args)

        return this._wrapCatchError(requestWithRetry)
    }

    _retryRequestIfExpired = (request, args) => {
        if (args._RETRY) {
            return request
        }

        return request.catch((error) => {
            const { response } = error

            if (response && response.status === 403) {
                return this._refreshAccessToken()
                    .then(() => {
                        const headers = args.headers || {}
                        const argsWithNewToken = {
                            ...args,
                            headers: {
                                ...headers,
                                Authorization: AuthService.getAccessToken(),
                            },
                            _RETRY: true,
                        }

                        return this.makeAuthRequest(argsWithNewToken)
                    })
                    .catch((_e) => {
                        throw error
                    })
            }

            throw error
        })
    }

    _wrapCatchError = (request) => {
        return request.catch((error) => {
            this._catchError(error)

            throw error
        })
    }

    _catchError = (error) => {
        const { response } = error
        if (response) {
            const { status, data, statusText } = response
            const { dispatch } = getStore()

            const message = data ? data.message : statusText

            if (status === 403) {
                dispatch &&
                    dispatch({
                        type: AUTH_FAILURE,
                        message,
                    })
            }

            if (status >= 500) {
                const title = response.statusText
                const { data } = response
                const message =
                    typeof data === 'object'
                        ? data.message
                        : typeof data === 'string'
                        ? data
                        : 'Something went wrong.'

                showServerError({ message, title })(dispatch)
            }
        }
    }
}

export const APIServiceExtend = (baseURL) => {
    return new APIServices(baseURL)
}

export default new APIServices()
