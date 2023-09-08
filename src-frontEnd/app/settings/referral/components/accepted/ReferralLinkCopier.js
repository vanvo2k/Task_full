import React, {Component, createRef} from 'react'
import {Button, Col, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import Clipboard from "clipboard"


class ReferralLinkCopier extends Component {
    _inputLink = createRef()
    _button = createRef()

    componentDidMount() {
        this._initClipboard()
    }

    componentWillUnmount() {
        this._destroyClipboard();
    }

    _destroyClipboard = () => {
        if (this._clipboard) {
            this._clipboard.destroy()
        }
    }

    _initClipboard = () => {
        if (this.initClipboard) return

        if (this._button.current) {
            this.initClipboard = true
            this._clipboard = new Clipboard(this._button.current)
        }
    }

    _handleClickInput = (e) => {
        e.preventDefault()

        this._button.current && this._button.current.click()
    }

    _handleEditLink = () => {
        this.props.onChangeLinkEditableState(true);
    }


    render() {
        const {base, code} = this.props;
        return (
            <div className='ReferralLinkCopier'>
                <Row>
                    <Col sm={9}>
                        <InputGroup size="sm">
                            <input
                                ref={this._inputLink}
                                onClick={this._handleClickInput}
                                type="text" id="ReferralLink" className="form-control Link" readOnly
                                value={base === '' ? '' : base + '/?ref=' + code}/>
                            <InputGroupAddon addonType="append">
                                <Button onClick={this._handleEditLink}>
                                    <FormattedMessage id="settings.referral.accepted.referral_link.edit"/>
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>


                    </Col>
                    <Col sm={3}>
                        <button
                            ref={this._button}
                            className="btn btn-primary btn-block Copy"
                            data-clipboard-target="#ReferralLink">
                            <FormattedMessage id="settings.referral.accepted.referral_link.copy"/>
                        </button>
                    </Col>
                </Row>
            </div>
        )
    }
}

ReferralLinkCopier.propTypes = {
    link: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
}

export default ReferralLinkCopier