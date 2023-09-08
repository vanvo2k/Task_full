import React, {Component} from "react"
import {connect} from "react-redux"
import KeywordAnalytics from "./KeywordAnalytics"
import {
    changePaginationNumber, changePaginationPerPage, changeSelectOptions, fetchListKeywords,
    fetchOptions
} from "../actions"
import {
    getKeywordOptions, getListResultsKeyword, getMetaResult,
    getSelectedOptions
} from "../selectors"
import DocTitle from "../../../shared-components/DocTitle"
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer"
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer"

class KeywordAnalyticsContainer extends Component {
    render() {
        const {props} = this

        return (
            <EnsureLoggedInContainer>
                <DocTitle title="Keyword Analytics">
                    <CanUseFeatureContainer
                        demoImage="keywords.jpg"
                        feature={'getItems'}
                        alternatively='all'>
                        <KeywordAnalytics {...props}/>
                    </CanUseFeatureContainer>
                </DocTitle>
            </EnsureLoggedInContainer>
        )
    }
}

const mapStateToProps = (state, props) => ({
    options: getKeywordOptions(state),
    selected: getSelectedOptions(state),
    results: getListResultsKeyword(state),
    meta: getMetaResult(state)
})

const mapDispatchToProps = {
    fetchOptions,
    changeSelectOptions,
    fetchListKeywords,
    changePaginationNumber,
    changePaginationPerPage
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordAnalyticsContainer)
