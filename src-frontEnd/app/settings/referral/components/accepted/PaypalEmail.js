import React, {Component} from 'react'
import {FormattedMessage} from "react-intl"

class PaypalEmail extends Component {
    constructor(props) {
        super(props);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

    _onChangeEmail(e) {
        this.props.onChangeEmail(e.target.value);
    }

    render() {
        const {paypalEmail, isUpdatingEmail, updateMessage} = this.props;
        return (
            <div className='PaypalEmail'>
                <h4 className="card-title"><FormattedMessage id="settings.referral.accepted.paypal_email.title"/></h4>
                <div className='card'>
                    <div className='card-body'>
                        <form onSubmit={this._onSubmit}>
                            <div className='row'>
                                <div className='col-12'>
                                    <p className='payment-title'><FormattedMessage
                                        id="settings.referral.accepted.paypal_email.PAYPAL"/></p>
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-9'>
                                    <input className='form-control'
                                           placeholder='your_email@example.com'
                                           type='email'
                                           value={paypalEmail}
                                           onChange={this._onChangeEmail}/>
                                </div>
                                <div className='col-3'>
                                    <button className='btn btn-primary btn-block'
                                            disabled={paypalEmail === '' || isUpdatingEmail}>
                                        <div className={'loader'.concat(isUpdatingEmail ? ' visible' : '')}>&#xe8d0;</div>
                                        <span>
                                            <FormattedMessage id="settings.referral.accepted.paypal_email.save"/></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div
                            className={'updateMessage ' + (updateMessage === 'Update successful' ? 'green-text' : 'red-text')}>{updateMessage}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaypalEmail