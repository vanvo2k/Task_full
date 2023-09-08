import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {CardElement, injectStripe} from 'react-stripe-elements';
import {Button} from "reactstrap";

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
    };
};


class PaymentMethods extends Component {
    state = {
        error: '',
        isValid: false,
        ready: false,
        loading: false
    };

    render() {
        const {error, ready, loading} = this.state;

        return (
            <div className={classNames('PaymentMethods', {ready})}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Payment methods</h4>

                        <form onSubmit={this._handleSubmit.bind(this)}>
                            <legend>Enter Card Details</legend>

                            <CardElement
                                onChange={this._handleOnChange.bind(this)}
                                onReady={this._handleReady.bind(this)}
                                {...createOptions()}
                            />

                            <div className="Error">
                                {error}
                            </div>

                            <Button disabled={loading}>Save Card</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    _handleReady() {
        this.setState({
            ready: true
        });
    }

    _handleOnChange() {
        console.log('[change]');
    }

    _handleSubmit(e) {
        e.preventDefault();
        const {stripe} = this.props;
        this.setState({
            loading: true
        });

        stripe.createToken().then(result => {
            const {error, token} = result;

            if (error && error.message) {
                this.setState({
                    error: error.message
                });
            } else {
                this.setState({
                    error: ''
                });
            }

            if (token) {
                this._handleSubmitToken(token)
            }
        }).finally(() => {
            this.setState({
                loading: false
            });
        })
    }

    _handleSubmitToken(token) {
        console.log(token);
    }
}

PaymentMethods.propTypes = {
    stripe: PropTypes.any
};

export default injectStripe(PaymentMethods);