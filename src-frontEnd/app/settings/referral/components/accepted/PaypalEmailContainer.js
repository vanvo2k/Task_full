import React, {Component} from 'react'
import PaypalEmail from "./PaypalEmail"
import {_getPaymentMethod, _updatePaymentMethod} from "../../../../../services/ReferralServices"

class PaypalEmailContainer extends Component {
    state = {
        paypalEmail: '',
        isUpdatingEmail: false,
        updateMessage: ''
    }

    componentDidMount() {
        _getPaymentMethod()
            .then(result => {
                if (result.success) {
                    this.setState({
                        paypalEmail: result.data.paypal,
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    _changePaypalEmail = (paypalEmail) => {
        this.setState({
            updateMessage: '',
            paypalEmail,
        })
    }

    _updatePaypalEmail = () => {
        this.setState({
            isUpdatingEmail: true,
            updateMessage: '',
        })
        _updatePaymentMethod(this.state.paypalEmail)
            .then(result => {
                if (result.success) {
                    this.setState({
                        updateMessage: 'Update successful',
                        isUpdatingEmail: false,
                    });
                } else {
                    this.setState({
                        updateMessage: result.message,
                        isUpdatingEmail: false,
                    });
                }
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    isUpdatingEmail: false,
                    updateMessage: 'Some thing went wrong, please try again',
                })
            })
    }


    render() {
        return (
            <PaypalEmail
                paypalEmail={this.state.paypalEmail}
                onChangeEmail={this._changePaypalEmail}
                onSubmit={this._updatePaypalEmail}
                isUpdatingEmail={this.state.isUpdatingEmail}
                updateMessage={this.state.updateMessage}
            />
        )
    }
}

export default PaypalEmailContainer
