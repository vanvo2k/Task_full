import React, {Component} from "react"
import {connect} from "react-redux"
import TMResultsPreview from "./TMResultsPreview"
import {getItemPreview, isShowResults} from "../../selectors"
import {hideTrademarkResults} from "../../actions"
import { getUserScopes } from "../../../../selectors/UserSelectors"

class TMResultsPreviewContainer extends Component {
    render() {
        const {props} = this

        return <TMResultsPreview {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    isOpen: isShowResults(state),
    item: getItemPreview(state),
    userScope:getUserScopes(state)
})

const mapDispatchToProps = {
    hideTrademarkResults
}

export default connect(mapStateToProps, mapDispatchToProps)(TMResultsPreviewContainer)
