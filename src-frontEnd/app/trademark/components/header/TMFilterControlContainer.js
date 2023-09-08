import React, {Component} from "react"
import {connect} from "react-redux"

class TMFilterControlContainer extends Component {
    render() {
        const {props} = this

        return <TMFilterControlContainer {...props}/>
    }
}

const mapStateToProps = (state, props) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TMFilterControlContainer)
