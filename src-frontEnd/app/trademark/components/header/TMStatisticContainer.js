import React, {Component} from "react"
import {connect} from "react-redux"
import {requestStatistic} from "../../actions"
import TMStatistic from "./TMStatistic"
import {getStatisticData} from "../../selectors"
import { getUserScopes } from "../../../../selectors/UserSelectors"
import { changeTotalTrial,changeTotalTradeMark } from "../../actions"

class TMStatisticContainer extends Component {
    render() {
        const {props} = this
        return <TMStatistic {...props}/>
    }

    componentDidMount() {
        this.props.requestStatistic()
    }
}

const mapStateToProps = (state, props) => ({
    data: getStatisticData(state),
    userScope:getUserScopes(state)
})

const mapDispatchToProps = {
    requestStatistic,
    changeTotalTrial,
    changeTotalTradeMark
}

export default connect(mapStateToProps, mapDispatchToProps)(TMStatisticContainer)
