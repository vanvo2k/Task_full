import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import {injectIntl, FormattedMessage} from "react-intl"
import getMessageText from "../../../../helpers/i18n/getMessageText"


class TMSortControl extends Component {
    _getLanguageText(key) {
        return getMessageText(this.props.intl)(key)
    }
    render() {
        const options = [
            this._buttonSelect('created', this._getLanguageText('tm.sort_by_date')),
            this._buttonSelect('warning', this._getLanguageText('tm.sort_by_warnings')),
        ]

        return (
            <div className="TMSortControl">
                <div className="Label"><FormattedMessage id="tm.sort_by"/>:</div>
                {options}
            </div>
        )
    }

    _buttonSelect(key, title) {
        const {data} = this.props
        const sortBy = data.get('by')

        return (
            <button key={key} onClick={(e) => this._handleClick(e, key)}
                    className={classNames("ButtonSelect", {Active: (sortBy === key)})}>
                {title}
            </button>
        )
    }

    _handleClick(e, key) {
        e.preventDefault()

        const {changeSortBy, triggerFetch} = this.props
        changeSortBy(key).then(triggerFetch)
    }
}

TMSortControl.propTypes = {
    data: PropTypes.object.isRequired,
    changeSortBy: PropTypes.func,
    triggerFetch: PropTypes.func,
    intl: PropTypes.object

}

export default injectIntl(TMSortControl)