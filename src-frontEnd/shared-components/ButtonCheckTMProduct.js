import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import {_checkTrademarkProduct} from "../services/ProductServices"
import isEqual from "lodash/isEqual"
import CanUseFeatureContainer from "../shared-containers/CanUseFeatureContainer"
import { FormattedMessage } from "react-intl"

class ButtonInner extends Component {
    state = {
        loading: false,
        checked: false,
        result: {}
    }

    _mounted = false

    componentDidMount() {
        this._mounted = true
        document.addEventListener('keyup', this._handleKeyUp)
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevState.result, this.state.result)) {
            this._submitResults()
        }

        if (prevProps.id !== this.props.id) {
            this._reset()
        }
    }

    componentWillUnmount() {
        this._mounted = false
        document.removeEventListener('keyup', this._handleKeyUp)
    }


    _handleKeyUp = (e) => {
        if (!e.keyCode || e.keyCode !== 84) return
        if (this.state.loading || this.state.checked) return

        this._checkTrademark()
    }

    _reset = () => {
        this.setState({
            loading: false,
            checked: false,
            result: {}
        })
    }

    _submitResults = () => {
        this.props.onResult(this.state.result)
    }

    _checkTrademark = () => {
        this.setState({
            loading: true,
        })

        this.props.onStart && this.props.onStart()

        _checkTrademarkProduct(this.props.id)
            .then(response => {
                if (!this._mounted) return

                const updateState = {checked: true, loading: false}

                const {success, data} = response
                if (success) {
                    updateState.result = data
                }

                this.setState(updateState)
            })
            .catch(error => {
                if (!this._mounted) return

                this.setState({
                    loading: false,
                    checked: false
                })
            })
    }

    _handleCheckTM = (e) => {
        e.preventDefault()

        if (this.state.loading || this.state.checked) {
            return
        }

        this._checkTrademark()
    }

    render() {
        const {loading, checked} = this.state

        return (
            <div onClick={this._handleCheckTM} className={classNames("ButtonCheckTMProduct", {loading, checked})}>
                <span className="Icon">
                    {/* {
                        !loading ? <i className="fas fa-trademark"/> : <i className="linear-ellipsis"/>
                    } */}
                    <FormattedMessage id="trademark.title"/>
                </span>
            </div>
        )
    }
}

class ButtonCheckTMProduct extends Component {
    render() {
        return (
            <CanUseFeatureContainer feature="beta-checktm" alternatively="all" noAlert>
                <ButtonInner {...this.props} />
            </CanUseFeatureContainer>
        )
    }
}

ButtonCheckTMProduct.propTypes = {
    id: PropTypes.string.isRequired,
    onStart: PropTypes.func,
    onResult: PropTypes.func.isRequired,
}

export default ButtonCheckTMProduct
