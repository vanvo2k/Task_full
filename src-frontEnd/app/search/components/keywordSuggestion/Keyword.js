import React from 'react'
import PropTypes from "prop-types";

class Keyword extends React.PureComponent {

  render() {
    const { url, keyword, themeCollections } = this.props
    const { color, ...style } = themeCollections

    return (
      <div style={style} className="KeywordSuggestionItem">
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color }}>
          {keyword}
        </a>
      </div>
    )
  }

}

PropTypes.propTypes = {
  themeCollections: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default Keyword
