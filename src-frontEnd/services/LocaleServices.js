import {addLocaleData} from "react-intl"
import en from 'react-intl/locale-data/en'
import vi from 'react-intl/locale-data/vi'
import StorageService from "./StorageServices"
import moment from "moment"
import "moment/locale/vi"

addLocaleData([...en, ...vi])

const allowLanguages = ['en', 'vi']

const _getUserLanguage = () => {
    const userData = StorageService.getUserData()

    const {settings} = userData
    if (settings) {
        const {language} = settings

        if (language) {
            return language
        }
    }

    const language = (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage ||
        'en-US'

    const code = language.toLowerCase().split(/[_-]+/)[0]

    if (allowLanguages.indexOf(code) === -1) {
        return 'en'
    }

    return code
}

const _store = {
    state: _getUserLanguage(),
    listeners: []
}

moment.locale(_store.state)

const _broadcast = () => {
    const {listeners, state} = _store

    moment.locale(_store.state)

    listeners.forEach(listener => {
        typeof listener === 'function' && listener(state)
    })
}

const _getMessages = () => {
    return {
        vi: require('../locale-data/vi.json'),
        en: require('../locale-data/en.json')
    }
}

const _flattenMessages = (nestedMessages, prefix = '') => {
    const nestedMessagesComputed = Object.assign({}, nestedMessages)

    return Object.keys(nestedMessagesComputed).reduce((messages, key) => {
        let value = nestedMessagesComputed[key]
        let prefixedKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === 'string') {
            messages[prefixedKey] = value
        } else {
            Object.assign(messages, _flattenMessages(value, prefixedKey))
        }

        return messages
    }, {})
}

export const changeUserLanguage = (language) => {
    _store.state = language
    _broadcast()
}

export const addLanguageListener = (listener) => {
    if (typeof listener !== 'function') {
        return
    }

    const {listeners} = _store
    if (listeners.indexOf(listener) !== -1) {
        return
    }

    _store.listeners = [].concat(listeners, listener)
}

export const removeLanguageListener = (listener) => {
    _store.listeners = _store.listeners.filter(_listener => _listener !== listener)
}

export const getUserLanguage = () => {
    return _store.state
}

export const getMessages = () => {
    const locale = getUserLanguage()
    const messages = _getMessages()

    return {
        ..._flattenMessages(messages['en']),
        ..._flattenMessages(messages[locale])
    }
}



