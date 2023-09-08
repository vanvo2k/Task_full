import React, {Component} from "react"
import {connect} from "react-redux"
import TrademarkPagination from "./TrademarkPagination"
import {getMetaData} from "../../selectors"
import {changeCurrentPage} from "../../actions"

class TrademarkPaginationContainer extends Component {
    render() {
        const {props} = this

        return <TrademarkPagination {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    meta: getMetaData(state)
})

const mapDispatchToProps = {
    changeCurrentPage
}

export default connect(mapStateToProps, mapDispatchToProps)(TrademarkPaginationContainer)
