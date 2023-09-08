import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {Button, Form} from "reactstrap"
import classNames from "classnames"
import {checkStartupTapId} from "../../../services/TapfiliateServices"

class RedeemCoupon extends Component {
    state = {
        open: false,
        couponCode: '',
        error: '',
        loading: false
    }

    _startupFetch = false
    _paymentMethodChanged = false

    constructor(props) {
        super(props)

        window.addEventListener('tap_vid_changed', this._handleOnTapIdAvailable.bind(this))
    }

    _onClickCouponCodeSale = (code) => {
        this.setState({
            couponCode: code
        })
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        const {method} = this.props

        this._paymentMethodChanged = (method !== prevProps.method)

        return null
    }

    componentDidMount() {
        checkStartupTapId()

        const {method, planId} = this.props
        this.props.fetchCouponAvailable({method, planId})
    }

    componentWillUnmount() {
        window.removeEventListener('tap_vid_changed', this._handleOnTapIdAvailable.bind(this))
    }

    componentDidUpdate() {
        const {available, method, planId, coupon, applyCouponCode} = this.props

        if (available && planId && coupon && !this._startupFetch) {
            this._startupFetch = true

            applyCouponCode({code: coupon, planId, method})
        }

        if (this._paymentMethodChanged) {
            this.props.fetchCouponAvailable({method, planId, code: coupon})
                .then(error => {
                    this.setState({
                        error: ''
                    })
                })
                .catch(error => {
                    const message = error.message || error

                    if (coupon) {
                        this.setState({
                            error: message
                        })
                    }
                })
        }
    }

    render() {
        const {open, error, loading,} = this.state
        const {isFree, available, coupon} = this.props

        if (isFree) {
            return null
        }

        const strClasses = classNames("RedeemCoupon", {hasCouponCode: !!coupon}, {open}, {loading}, {available}, {failed: !!error})

        return (
            <div className={strClasses}>
                {
                    this._renderAvailable()
                }

                {
                    !!error &&
                    <div className="Error">
                        <span className="Message">{error}</span>
                    </div>
                }
            </div>
        )
    }

    _renderAvailable() {
        const {couponCode, loading,} = this.state
        const {coupon, textDiscount, available} = this.props

        if (!available) {
            return null
        }

        return (
            <Fragment>
                <div
                    onClick={this._onClickToggle.bind(this)}
                    className="Text">
                    Have a Coupon? Redeem Here
                </div>

                {
                    !coupon ?
                        <Form
                            onSubmit={this._onSubmitCouponCode.bind(this)}
                            inline>
                            <input
                                ref="inputText"
                                onClick={this._onClickCouponCode.bind(this)}
                                onChange={this._onChangeCouponCode.bind(this)}
                                value={couponCode}
                                className="form-control"
                                data-lpignore="true"
                                placeholder="Coupon code"
                                readOnly={loading}
                                type="text"/>
                            <Button
                                disabled={loading || !couponCode}
                                type="submit">Apply</Button>
                        </Form>
                        :
                        <div className="CouponCode">
                            <span className="Code">{coupon}
                                <span className="Text">{textDiscount}</span>
                            </span>
                            <span
                                onClick={this._onClickRemoveCoupon.bind(this)}
                                className="Close">×</span>
                        </div>
                }
                <div className="Text" onClick={() => this._onClickCouponCodeSale('SALE30')}>
                    SALE30 (for 30% off)
                </div>

            </Fragment>
        )
    }

    _handleOnTapIdAvailable(e) {
        const {detail} = e

        const {coupon} = this.props

        if (coupon) {
            return
        }

        this.props.fetchTapfiliateCouponCode(detail)
            .then(result => {
                const {success, data} = result

                if (!success) {
                    return
                }

                const {code} = data

                if (code) {
                    this._applyCouponCode(code)
                }
            })
    }

    _onClickRemoveCoupon() {
        this.props.removeCouponCode()
    }

    _onClickCouponCode(e) {
        this.setState({
            error: ''
        })
    }

    _onChangeCouponCode(e) {
        const {value} = e.target
        this.setState({
            couponCode: value
        })
    }

    _onSubmitCouponCode(e) {
        e.preventDefault()

        const {couponCode} = this.state
        this._applyCouponCode(couponCode)
    }

    _applyCouponCode(couponCode) {
        const {planId, applyCouponCode, useCouponCode, method} = this.props
        this.setState({
            loading: true
        })

        applyCouponCode({planId, code: couponCode, method})
            .then((result) => {
                const stateUpdate = {
                    loading: false
                }

                const {success} = result

                if (success) {
                    useCouponCode(couponCode)
                    stateUpdate.error = ''
                }

                this.setState(stateUpdate)
            })
            .catch(error => {
                const message = error.message || error

                this.setState({
                    error: message,
                    loading: false
                })
            })
    }

    _onClickToggle() {
        this.setState({
            open: !this.state.open
        })
    }
}

RedeemCoupon.propTypes = {
    method: PropTypes.string,
    planId: PropTypes.string,
    coupon: PropTypes.string,
    textDiscount: PropTypes.string,
    isFree: PropTypes.bool,
    available: PropTypes.bool,
    fetchCouponAvailable: PropTypes.func.isRequired,
    applyCouponCode: PropTypes.func.isRequired,
    removeCouponCode: PropTypes.func.isRequired,
    useCouponCode: PropTypes.func.isRequired,
    fetchTapfiliateCouponCode: PropTypes.func.isRequired,
}

export default RedeemCoupon
