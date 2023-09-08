import React, {Component} from "react"
import PropTypes from "prop-types"
import {CardElement, injectStripe} from "react-stripe-elements"
import {Button} from "reactstrap"
import classNames from "classnames"

const createOptions = (fontSize = '18px') => {
    return {
        style: {
            base: {
                fontSize,
                color: '#333',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#ed4f32',
            }
        },
    }
}

class StripeAddCard extends Component {
    state = {
        error: '',
        isValid: false,
        ready: false,
        loading: false,
        form: {
            name: '',
        }
    }

    render() {
        const {user} = this.props
        const {error, ready, loading, form} = this.state
        const {name} = form

        return (
            <div className={classNames("StripeAddCard", {ready})}>
                <form onSubmit={this._handleSubmit.bind(this)}>
                    <legend>Enter Card Details</legend>

                    <CardElement
                        onChange={this._handleOnChange.bind(this)}
                        onReady={this._handleReady.bind(this)}
                        {...createOptions()}
                    />

                    <input
                        onChange={this._handleOnChangeInput.bind(this, 'name')}
                        className="Name" value={name} name="name" type="text" placeholder="Name on card"/>

                    <div className="Error">
                        {error}
                    </div>

                    <Button color="success" disabled={loading || !user}>Add new card</Button>
                </form>
            </div>
        )
    }

    _handleOnChangeInput(field, e) {
        const {value} = e.target
        const {form} = this.state

        this.setState({
            form: {
                ...form,
                [field]: value
            }
        })
    }

    _validateForm() {
        const {form} = this.state

        const {name} = form

        if (!name || !name.trim()) {
            this.setState({
                error: 'Please enter your name as shown on the credit card.',
                loading: false
            })

            return false
        }

        return true
    }

    _handleReady() {
        this.setState({
            ready: true
        })
    }

    _handleOnChange() {
        console.log('[change]')
    }

    _handleSubmit(e) {
        e.preventDefault()

        if (!this._validateForm()) {
            return
        }

        const {stripe} = this.props
        this.setState({
            loading: true
        })

        const {form} = this.state
        const {name} = form

        stripe.createToken({
            name,
        }).then(result => {
            const {error, token} = result

            if (error && error.message) {
                this.setState({
                    error: error.message,
                    loading: false
                })
            } else {
                this.setState({
                    error: '',
                    loading: false
                })
            }

            if (token) {
                this._handleSubmitToken(token)
            }
        }).catch((error) => {
            this.setState({
                loading: false
            })

            throw error
        })
    }

    _handleSubmitToken(token) {
        const {user, addCardToCustomer} = this.props
        const {id} = token
        const {form} = this.state

        addCardToCustomer({stripeUID: user.get('id'), token: id, form})
            .then(() => {
                this.setState({
                    error: ''
                })
            })
            .catch(error => {
                const message = error.message || error

                this.setState({
                    error: message
                })
            })
    }
}

StripeAddCard.propTypes = {
    stripe: PropTypes.object,
    user: PropTypes.object.isRequired,
    addCardToCustomer: PropTypes.func.isRequired,
}

export default injectStripe(StripeAddCard)
