const _getViewport = () => {
    let viewPortWidth
    let viewPortHeight

    if (typeof window.innerWidth !== 'undefined') {
        viewPortWidth = window.innerWidth
        viewPortHeight = window.innerHeight
    }

    else if (typeof document.documentElement !== 'undefined'
        && typeof document.documentElement.clientWidth !==
        'undefined' && document.documentElement.clientWidth !== 0) {

        viewPortWidth = document.documentElement.clientWidth
        viewPortHeight = document.documentElement.clientHeight
    }

    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth
        viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }

    return {
        width: viewPortWidth,
        height: viewPortHeight
    }
}

const _isMobile = (viewport) => {
    return !!viewport['width'] && viewport['width'] <= 480
}

const _getData = () => {
    const viewport = _getViewport()

    return {
        viewport,
        isMobile: _isMobile(viewport)
    }
}

const _updateData = () => {
    _store.state = _getData()
    _broadcast()
}

const _store = {
    state: _getData(),
    subscribers: []
}

const _broadcast = () => {
    const {subscribers, state} = _store

    subscribers.forEach(subscriber => {
        typeof subscriber === 'function' && subscriber(state)
    })
}

export const addViewportSubscriber = (subscriber) => {
    if (typeof subscriber !== 'function') {
        return
    }

    const {subscribers} = _store

    if (subscribers.indexOf(subscriber) !== -1) {
        return
    }

    _store.subscribers = [].concat(subscribers, subscriber)
}

export const removeViewportSubscriber = (subscriber) => {
    _store.subscribers = _store.subscribers.filter(_subscriber => subscriber !== _subscriber)
}

export const isMobile = () => {
    return _store.state.isMobile
}

export const getViewPort = () => {
    return {
        ..._store.state
    }
}

window.addEventListener('resize', _updateData)
