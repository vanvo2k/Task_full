import React, {Component} from "react"
import PropTypes from "prop-types"
import {Button, Col, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {FormattedMessage} from "react-intl"
import {_changeReferralCode} from "../../../../../services/ReferralServices"


class ReferralLinkEditor extends Component {
    state = {
        refCode: this.props.code,
        errorMessage: '',
        isUpdating: false,
    }

    handleChangeRefCode = (e) => {
        this.setState({
            refCode: e.target.value,
        })
    }

    _handleCancelEdit = () => {
        this.props.onChangeLinkEditableState(false);
    }

    _handleSaveLink = (e) => {

        const {refCode} = this.state;
        e.preventDefault();
        this.setState({
            isUpdating:true,
        })
        _changeReferralCode(refCode)
            .then(result => {
                if (result.success) {
                    this.props.onChangeLinkEditableState(false);
                    this.props.onChangeRefCode(refCode);
                    this.props.onUpdateLink();
                } else {
                    this.setState({
                        errorMessage: result.message,
                        isUpdating:false,
                    })
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorMessage: error.message,
                    isUpdating:false,
                })
            })

    }


    render() {
        const {base} = this.props;
        const {errorMessage , isUpdating} = this.state;
        return (
            <div className="ReferralLinkEditor">
                <form onSubmit={this._handleSaveLink}>
                    <Row>
                        <Col sm={9}>
                            <InputGroup size="sm">
                                <InputGroupAddon addonType="prepend">{base + '/?ref='}</InputGroupAddon>
                                <Input placeholder="username" value={this.state.refCode}
                                       onChange={this.handleChangeRefCode}/>
                                <InputGroupAddon
                                    addonType="append"
                                    onClick={this._handleCancelEdit}
                                    className="edit-canceler"><Button type="button" className="edit-canceler">&#xe92a;</Button></InputGroupAddon>
                            </InputGroup>
                        </Col>
                        <Col sm={3}>
                            <button className="btn btn-primary btn-block Copy" type="submit" disabled={isUpdating}>
                                <div className={'loader'.concat(isUpdating ? ' visible' : '')}>&#xe8d0;</div>
                                    <FormattedMessage id="settings.referral.accepted.paypal_email.save"/>
                            </button>
                        </Col>
                    </Row>
                </form>

                <Row>
                    {
                        errorMessage === '' ? <div/> : (
                            <div className='col-12 text-danger'>{errorMessage}</div>
                        )
                    }
                </Row>
            </div>
        )
    }
}

ReferralLinkEditor.propTypes = {
    onChangeLinkEditableState: PropTypes.func.isRequired,
    onUpdateLink: PropTypes.func.isRequired,
    base: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    onChangeRefCode: PropTypes.func.isRequired,
}

export default ReferralLinkEditor
