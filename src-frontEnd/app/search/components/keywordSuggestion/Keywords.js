import classNames from 'classnames'
import React, { Fragment } from 'react'
import PropTypes from "prop-types";

import Keyword from './Keyword'
import keywords from './keywordSuggestion.json'

const _themeCollections = [
  // Red
  {
    backgroundColor: '#e9dcfc',
    color: '#A490D0',
    borderColor: '#A490D0',
  },
  // Yellow
  {
    backgroundColor: '#fff1c8',
    color: '#d0a35f',
    borderColor: '#e9c36c',
  },
  // Green
  {
    backgroundColor: '#edf9f0',
    color: '#7eb487',
    borderColor: '#aad2ad',
  },
  // Blue
  {
    backgroundColor: '#e5f6f6',
    color: '#7da2ed',
    borderColor: '#9dc1ff',
  },
]

const _genRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const _getRandTheme = () => {
  return _themeCollections[_genRandInt(0, _themeCollections.length - 1)]
}

const _prepareKeyword = keyword => {
  const x = encodeURIComponent(keyword)
  const y = x.replaceAll('%20', '+')
  return y
}

const _genKeywordUrl = keyword => `https://www.amazon.com/s?k=${_prepareKeyword(keyword)}`

class Keywords extends React.Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    if (Boolean(this.props.searchTermQuery) === false && Boolean(nextProps.searchTermQuery) === true) {
      return true
    }

    return false
  }

  render() {
    return (
      <Fragment>
        {keywords.map((item, idx) =>
        (
          <Keyword key={idx} themeCollections={_getRandTheme()} url={_genKeywordUrl(item.keyword)} keyword={item.keyword} />
        )
        )}
      </Fragment>
    )
  }
}

Keywords.propTypes = {
  searchTermQuery: PropTypes.string,
};

export default Keywords
