import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {getMetaListItems, getPaginationControlData} from "../../../selectors"
import ExportButton from "./ExportButton"
import CanUseFeatureContainer from "../../../../../shared-containers/CanUseFeatureContainer";

class ExportSearchResultContainer extends Component {
    render() {
        return (
            <CanUseFeatureContainer feature="csv-export" noAlert>
                <ExportButton {...this.props} />
            </CanUseFeatureContainer>
        )
    }
}

const mapStateToProps = (state, props) => ({
    metaData: getMetaListItems(state),
    paginationData: getPaginationControlData(state)
})

export default withRouter(connect(mapStateToProps, null)(ExportSearchResultContainer))
