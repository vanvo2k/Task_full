import React from 'react'
import { connect } from 'react-redux'

import KeywordSuggestion from './KeywordSuggestion'
import { getSearchTermQuery } from '../../selectors'

class KeywordSuggestionContainer extends React.Component {
  render() {
    const { props } = this

    return (
      <KeywordSuggestion { ...props } />
    )
  }
}

const mapStateToProps = (state, props) => ({
  searchTermQuery: getSearchTermQuery(state),
});

export default connect(mapStateToProps)(KeywordSuggestionContainer)
