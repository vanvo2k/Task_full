import React, {Component} from "react"
import PropTypes from "prop-types"
import {Button} from "reactstrap"
import {withRouter} from "react-router-dom"
import {setTapId} from "../../../services/TapfiliateServices"

class ButtonCheckout extends Component {
    state = {
        loading: false,
    }

    _canCheckout() {
        const {isFree} = this.props
        if (isFree) {
            return true
        }

        return this.props.canCheckout
    }

    render() {
        const canCheckout = this._canCheckout()
        const {loading} = this.state

        return (
            <div className="ButtonCheckout text-right">
                <Button
                    className="Cancel"
                    color="link"
                    onClick={this._handleClickCancel.bind(this)}
                    disabled={loading}>Cancel</Button>

                <Button
                    className="Checkout"
                    disabled={!canCheckout || loading}
                    onClick={this._handleClickCheckout.bind(this)}
                    color="primary">Checkout</Button>
            </div>
        )
    }

    _handleClickCancel() {
        const {history, emptyCart} = this.props

        emptyCart()
            .then(() => {
                history.push('/pricing')
            })
    }

    _handleClickCheckout() {
        this.setState({
            loading: true
        })

        this._checkout()
            .then(() => {
                this.setState({
                    loading: false
                })

                this.props.emptyCart()
                setTapId(null)
            })
            .catch(() => {
                this.setState({
                    loading: false
                })
            })
    }

    _checkout() {
        const {method, paypalCheckout, planId, coupon, isFree, freeCheckout} = this.props

        if (isFree) {
            return freeCheckout({planId})
        }

        switch (method) {
            case 'paypal':
                return paypalCheckout({
                    planId,
                    coupon
                })

            default:
                return Promise.resolve(true)
        }
    }
}

ButtonCheckout.propTypes = {
    method: PropTypes.string.isRequired,
    isFree: PropTypes.bool,
    planId: PropTypes.string,
    cardId: PropTypes.any,
    coupon: PropTypes.string,
    canCheckout: PropTypes.bool,
    stripeCheckout: PropTypes.func.isRequired,
    paypalCheckout: PropTypes.func.isRequired,
    freeCheckout: PropTypes.func.isRequired,
    emptyCart: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default withRouter(ButtonCheckout)
