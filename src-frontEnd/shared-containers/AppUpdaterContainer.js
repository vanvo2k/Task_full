import {Component} from "react"
import {connect} from "react-redux"
import {getNewAppData, getOldAppData} from "../selectors/AppSelectors"
import {isAuthenticated} from "../selectors/AuthSelectors"
import {logOut} from "../actions/AuthActions"
import {fetchAppData, fetchCurrentAppData, fetchForceRefreshApp, storeAppData} from "../actions/AppActions"
import {unregister} from "../registerServiceWorker"
import registerServiceWorker from "../registerServiceWorker"
import compareVersions from "compare-versions"
import PropTypes from "prop-types"
import setCookie from "../helpers/cookie/setCookie"
import * as RealtimeServices from "../services/ws/RealtimeServices"

class AppUpdaterContainer extends Component {
    _interval = null

    componentDidMount() {
        this._fetchAppData()

        this._interval = setInterval(() => {
            this._fetchAppData()
        }, 10 * 60 * 1000)

        this._subscribe()
    }

    componentWillUnmount() {
        this._interval && clearInterval(this._interval)
    }

    _fetchAppData = () => {
        const {fetchCurrentAppData, fetchAppData} = this.props

        Promise.all([fetchCurrentAppData(), fetchAppData()])
            .then(this._handleAfterFetchAppData.bind(this))
    }

    _subscribe() {
        RealtimeServices.subscribe('update-available', () => {
            unregister()
            setCookie('__tamz_app_refresh', false)
        })
    }

    _handleAfterFetchAppData() {
        const {newApp, oldApp, isAuthenticated, logOut, storeAppData} = this.props

        const newVersion = newApp.get('version') || false
        const reSignIn = !!newApp.get('reSignIn')
        const oldVersion = oldApp.get('version') || false

        let canUpdate = false
        if (newVersion && newVersion.length && !oldVersion) {
            canUpdate = true
        } else if (typeof newVersion === 'string' && typeof oldVersion === 'string') {
            canUpdate = compareVersions(newVersion, oldVersion) > 0
        }

        if (reSignIn && isAuthenticated) {
            canUpdate && logOut()
        }

        if (canUpdate && oldVersion) {
            unregister()
        }

        if (process.env.REACT_APP_ENV === 'production') {
            registerServiceWorker(newVersion)
        }

        storeAppData(newApp)
    }

    render() {
        return null
    }
}

AppUpdaterContainer.propTypes = {
    newApp: PropTypes.object,
    oldApp: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    storeAppData: PropTypes.func.isRequired,
    fetchCurrentAppData: PropTypes.func.isRequired,
    fetchAppData: PropTypes.func.isRequired,
    fetchForceRefreshApp: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
    newApp: getNewAppData(state),
    oldApp: getOldAppData(state),
    isAuthenticated: isAuthenticated(state),
})

const mapDispatchToProps = {
    fetchAppData,
    fetchCurrentAppData,
    storeAppData,
    fetchForceRefreshApp,
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(AppUpdaterContainer)
