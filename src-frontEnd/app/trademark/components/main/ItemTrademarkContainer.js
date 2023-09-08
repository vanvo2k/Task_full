import React, {Component} from "react"
import {connect} from "react-redux"
import ItemTrademark from "./ItemTrademark"
import {
    deleteTradeMark, fetchTrademarkDetail, markReadTrademark, requestRefreshManual,
    showTrademarkResults,openTrademarkResults
} from "../../actions"
import {getMetaData} from "../../selectors"
import { getUserScopes } from "../../../../selectors/UserSelectors"

class ItemTrademarkContainer extends Component {
    render() {
        const {props} = this

        return <ItemTrademark {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    meta: getMetaData(state),
    userScope:getUserScopes(state)
})

const mapDispatchToProps = {
    deleteTradeMark,
    requestRefreshManual,
    fetchTrademarkDetail,
    showTrademarkResults,
    markReadTrademark,
    openTrademarkResults
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemTrademarkContainer)
