import React, {Component} from "react"
import PropTypes from "prop-types"
import {injectIntl} from "react-intl"
import getMessageText from "../../../helpers/i18n/getMessageText"

class SearchTermKeywords extends Component {
    state = {
        term: ''
    }

    _timeout = null
    _searchDelay = 1000

    render() {
        const {term} = this.state
        const placeHolder = getMessageText(this.props.intl)('keyword.placeholder', 'Search keyword')

        return (
            <div className="SearchTermKeywords">
                <input value={term}
                       placeholder={placeHolder}
                       onChange={this._handleOnChangeSearchTerm}
                       className="form-control"
                       type="text"/>
            </div>
        )
    }

    _handleOnChangeSearchTerm = (e) => {
        const {value} = e.target

        this.setState({
            term: value
        })

        if (this._timeout) {
            clearTimeout(this._timeout)
        }

        this._timeout = setTimeout(() => {
            this.props.onChange(value)
        }, this._searchDelay)
    }
}

SearchTermKeywords.propTypes = {
    onChange: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
}

export default injectIntl(SearchTermKeywords)
