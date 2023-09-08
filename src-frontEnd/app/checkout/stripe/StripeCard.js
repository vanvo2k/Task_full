import React, {Component} from "react"
import PropTypes from "prop-types"

class StripeCard extends Component {
    render() {
        const {card} = this.props
        const {brand, last4, exp_month, exp_year, id} = card.toJS()

        return (
            <div data-id={id} className="StripeCard">
                <div className="Brand">{brand}</div>

                <div className="Number">XXXX - XXXX - XXXX - {last4}</div>

                <div className="Expires">
                    <span className="Label">Expires on:</span>
                    <span className="Month">{exp_month} / </span>
                    <span className="Year">{exp_year}</span>
                </div>

                <span
                    onClick={this._handleClickRemove.bind(this)}
                    className="Remove">×</span>
            </div>
        )
    }

    _handleClickRemove(e) {
        const {onRemove, card} = this.props

        onRemove && onRemove(card.get('id'))
    }
}

StripeCard.propTypes = {
    card: PropTypes.object,
    onRemove: PropTypes.func,
    onClickSubscribe: PropTypes.func,
}

export default StripeCard
