import classNames from 'classnames'
import React from 'react'
import GoogleTrend from './GoogleTrend'
import PropTypes from "prop-types";

class KeywordChart extends React.Component {
  render() {
    const { className, searchTermQuery } = this.props

    return (
      <div className={classNames('KeywordChart', className)}>
        {searchTermQuery && <GoogleTrend searchTermQuery={searchTermQuery} />}
      </div>
    )
  }
}

KeywordChart.propTypes = {
  searchTermQuery: PropTypes.string,
};


export default KeywordChart
