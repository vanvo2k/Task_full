import classNames from 'classnames'
import React from 'react'
import { Collapse } from 'reactstrap'
import PropTypes from "prop-types";

import Keywords from './Keywords';

class KeywordSuggestion extends React.Component {
  state = {
    isCollapse: false,
    firstTimeRender: true,
  }

  _toggle = () => {
    this.setState({
      isCollapse: !this.state.isCollapse
    })
  }

  render() {
    const { className, searchTermQuery } = this.props
    const { isCollapse, firstTimeRender } = this.state
    if (firstTimeRender && searchTermQuery) {
      this.setState({ isCollapse: true, firstTimeRender: false })
    } else if (!firstTimeRender && !searchTermQuery) {
      this.setState({ isCollapse: false, firstTimeRender: true })
    }

    return (
      <div className={classNames('Wrapper', className)}>
        <div className="Title" onClick={this._toggle}>
          <h5>Keywords</h5>
          {
            !isCollapse && <span className="fas fa-caret-down" title="Show keywords" />
          }
          {
            isCollapse && <span className="fas fa-caret-up" title="Hide keywords" />
          }
        </div>
        <Collapse isOpen={!isCollapse}>
          <div className={classNames('KeywordSuggestion', className)}>
            <Keywords searchTermQuery={searchTermQuery} />
          </div>
        </Collapse>
      </div>
    )
  }
}

KeywordSuggestion.propTypes = {
  searchTermQuery: PropTypes.string,
};

export default KeywordSuggestion
