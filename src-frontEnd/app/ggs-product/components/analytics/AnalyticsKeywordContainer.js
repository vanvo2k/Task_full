import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getFilterMarket, getSearchTermQuery, getSearchTypeQuery} from "../../selectors"
import AnalyticsKeyword from "./AnalyticsKeyword"

class AnalyticsKeywordContainer extends Component {
    render() {
        return (
            <div className="AnalyticsKeywordContainer">
                <div className="container">
                    <AnalyticsKeyword {...this.props}/>
                </div>
            </div>
        )
    }
}

AnalyticsKeywordContainer.propTypes = {
    keyword: PropTypes.string.isRequired,
    searchType: PropTypes.string.isRequired,
    market: PropTypes.string.isRequired
}

const _mapStateToProps = (state, props) => ({
    keyword: getSearchTermQuery(state),
    searchType: getSearchTypeQuery(state),
    market: getFilterMarket(state)
})

export default connect(_mapStateToProps)(AnalyticsKeywordContainer)
