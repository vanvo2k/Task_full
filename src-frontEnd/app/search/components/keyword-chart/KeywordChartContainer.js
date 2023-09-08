import React, { PureComponent } from 'react'
import { connect } from "react-redux";

import { getSearchTermQuery } from '../../selectors'
import KeywordChart from './KeywordChart'

class KeywordChartContainer extends PureComponent {
  render() {
    const { props } = this

    return (
      <KeywordChart {...props} />
    )
  }
}

const mapStateToProps = (state, props) => ({
  searchTermQuery: getSearchTermQuery(state),
});

export default connect(mapStateToProps)(KeywordChartContainer)
