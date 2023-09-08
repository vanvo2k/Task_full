import {Component} from "react"
import PropTypes from "prop-types"
import {unregister} from "../../registerServiceWorker"
import {withRouter} from "react-router-dom"
import * as RealtimeServices from "../../services/ws/RealtimeServices"

const MAX_FAILED_REQUESTS = 3

class Heartbeat extends Component {
    heartbeatInterval = null

    state = {
        failedRequests: 0
    }

    render() {
        return null
    }

    componentDidMount() {
        this._setupHeartbeat()
        this._forceRefresh()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.failedRequests > MAX_FAILED_REQUESTS) {
            return this.props.logOut()
        }
    }

    componentWillUnmount() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval)
        }
    }

    _forceRefresh() {
        const {isAuthenticated, heartbeat, history} = this.props
        if (!isAuthenticated) {
            return
        }

        RealtimeServices.subscribe('heart-beat', () => {
            heartbeat()
        })

        RealtimeServices.subscribe('force-refresh', () => {
            unregister()
            setTimeout(() => {
                window.location.reload(true)
            }, 500)
        })

        RealtimeServices.subscribe('go-to', (to) => {
            to && typeof to === 'string' && history.push(to)
        })
    }

    _setupHeartbeat() {
        this._beat()

        this.heartbeatInterval = setInterval(() => {
            this._beat()
        }, 60 * 1000)
    }

    _beat = () => {
        this.props.heartbeat()
            .then(result => {
                if (!result) {
                    return this.setState(({failedRequests}) => ({
                        failedRequests: parseInt(failedRequests, 10) + 1
                    }))
                }

                const {success, code} = result

                if (!success && code === 403) {
                    return this.props.logOut()
                }

                this.setState({
                    failedRequests: 0
                })
            })
            .catch(error => {
                this.setState(({failedRequests}) => ({
                    failedRequests: parseInt(failedRequests, 10) + 1
                }))
            })
    }
}

Heartbeat.propTypes = {
    history: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    heartbeat: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
}

export default withRouter(Heartbeat)
