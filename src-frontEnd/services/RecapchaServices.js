const _store = {
    ready: false
}

const _getReady = () => {
    return new Promise(resolve => {
        if (_store.ready) {
            return resolve(true)
        }

        window.grecaptcha && window.grecaptcha.ready(() => {
            _store.ready = true
            console.log('grecaptcha ready')

            resolve(true)
        })
    })
}

export const getReady = _getReady

export const getToken = (action) => {
    return _getReady()
        .then(() => {
            if (!window.grecaptcha) {
                return Promise.resolve('')
            }

            return window.grecaptcha.execute('6Lc3vV4UAAAAAALcAyjyWOPB02m29XRvHR6Tg6B8', {action})
        })
        .catch(error => {
            console.log(error)

            return Promise.resolve('')
        })
}

_getReady()
