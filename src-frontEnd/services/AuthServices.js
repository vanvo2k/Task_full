import {_getProfile} from "./UserService"
import StorageService from "./StorageServices"
import {getAppURL} from "../helpers/CommonHelper"
import {parseSearchQuery} from "../helpers/RouterHelper"
import getEnv from "../helpers/common/getEnv"
import {changeUserLanguage} from "./LocaleServices"

class AuthServices {
    _accessToken = ''
    _refreshToken = ''

    _subscribers = []

    isAuthenticated = () => {
        return this._accessToken && this._refreshToken
    }

    _broadCast = () => {
        this._subscribers.forEach(subscriber => {
            typeof subscriber === 'function' && subscriber()
        })
    }

    subscribe = (subscriber) => {
        if (!subscriber || typeof subscriber !== 'function') {
            return
        }

        if (this._subscribers.indexOf(subscriber) !== -1) {
            return
        }

        this._subscribers = [].concat(this._subscribers, [subscriber])
    }

    unsubscribe = (subscriber) => {
        this._subscribers = this._subscribers.filter(sub => {
            return sub !== subscriber
        })
    }

    setRefreshToken(refreshToken) {
        this._refreshToken = refreshToken
        StorageService.set('refreshToken', refreshToken)

        return this
    }

    setAccessToken(accessToken) {
        this._accessToken = accessToken
        StorageService.set('access_token', accessToken)
        this._broadCast()

        return this
    }

    getAccessToken() {
        return StorageService.get('access_token') || this._accessToken || ''
    }

    getRefreshToken() {
        return StorageService.get('refreshToken') || this._refreshToken || ''
    }

    loginWithSocial(provider) {
        const baseUrl = getEnv('hostAPI')
        const callback = getAppURL('/oauth-callback')
        window.location.href = baseUrl + `/oauth?provider=${provider}&redirectUri=${encodeURI(callback)}`
    }

    getStartup() {
        const access_token = StorageService.get('access_token')
        const refreshToken = StorageService.get('refreshToken')
        const profile = StorageService.getUserData()

        if (refreshToken) {
            this.setRefreshToken(refreshToken)
        }

        if (access_token) {
            this.setAccessToken(access_token)

            return Promise.resolve({
                access_token,
                profile
            })
        }

        return Promise.resolve(false)
    }

    handleOauthCallback(history) {
        const params = parseSearchQuery(history)
        const {access_token, refreshToken} = params
        this.setAccessToken(access_token)
        this.setRefreshToken(refreshToken)

        return _getProfile()
            .then((data) => {
                const {profile} = data
                StorageService.setUserData(profile)

                const {settings} = profile
                const language = settings.language
                if (settings && settings.language && typeof settings.language === 'string') {
                    changeUserLanguage(language)
                }

                return Promise.resolve({
                    profile,
                    access_token,
                    refreshToken
                })
            })
    }

    logout() {
        this.setAccessToken(null)
        StorageService.remove('access_token')
        StorageService.removeUserData()

        this._broadCast()

        return Promise.resolve()
    }
}

export default new AuthServices()
