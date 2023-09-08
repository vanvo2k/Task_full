import React, {Component} from "react"
import PropTypes from "prop-types"
import StripeCard from "./StripeCard"

class StripeListCards extends Component {
    render() {
        const {user} = this.props
        if (!user || !user.size) {
            return null
        }

        const cards = user.get('cards')

        return (
            <div className="StripeListCards">
                {
                    cards.map(card => {
                        return <StripeCard
                            key={card.get('id')}
                            onRemove={this._handleRemoveCard.bind(this)} card={card}/>
                    })
                }
            </div>
        )
    }

    _handleRemoveCard(cardId) {
        const {user} = this.props
        this.props.removeCard({cardId, stripeUID: user.get('id')})
    }
}

StripeListCards.propTypes = {
    user: PropTypes.object,
    plan: PropTypes.object,
    coupon: PropTypes.string,
    onUpdatedCards: PropTypes.func,
    removeCard: PropTypes.func
}

export default StripeListCards
