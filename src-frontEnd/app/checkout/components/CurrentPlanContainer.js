import React, {Component} from "react"
import {connect} from "react-redux"
import CurrentPlan from "./CurrentPlan"
import {getPlanDetail} from "../selectors"

class CurrentPlanContainer extends Component {
    render() {
        const {props} = this

        return <CurrentPlan {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    plan: getPlanDetail(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPlanContainer)
