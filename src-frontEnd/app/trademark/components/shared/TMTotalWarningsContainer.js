import React, {Component} from "react"
import {connect} from "react-redux"
import TMTotalWarnings from "./TMTotalWarnings"
import {fetchTotalWarnings} from "../../actions"
import {getTotalWarnings} from "../../selectors"
import * as RealtimeServices from "../../../../services/ws/RealtimeServices"

class TMTotalWarningsContainer extends Component {
    static _subscribed = false

    componentDidMount() {
        if (TMTotalWarningsContainer._subscribed) return
        this.props.fetchTotalWarnings()
        TMTotalWarningsContainer._subscribed = true
        RealtimeServices.subscribe('trademarks-updated', this._handleUpdateAvailable)
    }

    componentWillUnmount() {
        RealtimeServices.unsubscribe('trademarks-updated', this._handleUpdateAvailable)
        TMTotalWarningsContainer._subscribed = false
    }

    _handleUpdateAvailable = () => {
        this.props.fetchTotalWarnings()
    }

    render() {
        return <TMTotalWarnings {...this.props}/>
    }
}

const mapStateToProps = (state, props) => ({
    total: getTotalWarnings(state)
})

const mapDispatchToProps = {
    fetchTotalWarnings
}

export default connect(mapStateToProps, mapDispatchToProps)(TMTotalWarningsContainer)
