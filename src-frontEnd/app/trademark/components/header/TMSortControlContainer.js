import React, {Component} from "react"
import {connect} from "react-redux"
import TMSortControl from "./TMSortControl"
import {getSortData} from "../../selectors"
import {changeSortBy} from "../../actions"

class TMSortControlContainer extends Component {
    render() {
        const {props} = this

        return <TMSortControl {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    data: getSortData(state)
})

const mapDispatchToProps = {
    changeSortBy
}

export default connect(mapStateToProps, mapDispatchToProps)(TMSortControlContainer)
