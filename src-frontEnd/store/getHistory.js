import createBrowserHistory from 'history/createBrowserHistory'

const _history = createBrowserHistory({})

export default () => {
    return _history
}