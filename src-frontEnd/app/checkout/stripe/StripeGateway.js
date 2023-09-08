import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import StripeListCardsContainer from "./StripeListCardsContainer"
import StripeAddCardContainer from "./StripeAddCardContainer"

class StripeGateway extends Component {
    componentDidMount() {
        this._fetchUser()
    }

    _fetchUser() {
        this.props.fetchStripeUser()
    }

    render() {
        const {user, changePaymentMethod, method} = this.props

        if (!user || !user.size) {
            return null
        }

        const cards = user.get('cards')
        const noCard = !cards || !cards.size

        const StripeCard = noCard ?
            <StripeAddCardContainer/> :
            <StripeListCardsContainer/>

        return (
            <div className={classNames('StripeGateway')}>
                <div className="HeaderGateway">
                    <input
                        type="radio"
                        className="InputMethod"
                        name="payment_method"
                        id="paymentMethodStripe"
                        onChange={() => {
                            changePaymentMethod('stripe')
                        }}
                        checked={method === 'stripe'}
                        value="stripe"/>
                    <label htmlFor="paymentMethodStripe" className="Name">Credit or Debit Card</label>
                </div>

                {
                    method === 'stripe' && StripeCard
                }
            </div>
        )
    }
}

StripeGateway.propTypes = {
    method: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    plan: PropTypes.object.isRequired,
    fetchStripeUser: PropTypes.func.isRequired,
    changePaymentMethod: PropTypes.func.isRequired,
}

export default StripeGateway
