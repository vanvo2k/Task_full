import React, {Component} from "react"
import PropTypes from "prop-types"
import {Col, Row} from "reactstrap"

import ReferralLinkEditor from "./ReferralLinkEditor"
import {FormattedMessage} from "react-intl"
import ReferralLinkCopier from "./ReferralLinkCopier"

class ReferralLink extends Component {

    state = {
        isLinkEditable: false,
    }


    _changeLinkEditState = (state) => {
        this.setState({
            isLinkEditable: state,
        });
    }

    render() {
        const {link, code, base} = this.props;
        const {isLinkEditable} = this.state;
        return (
            <div className='ReferralLink'>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title"><FormattedMessage
                            id="settings.referral.accepted.referral_link.title"/></h4>
                        <p className="card-text">
                            <FormattedMessage id="settings.referral.accepted.referral_link.description"/>
                        </p>

                        <div className="Sharing">
                            <Row>
                                <Col sm={9}>
                                    <p className="card-title ">
                                        <FormattedMessage id="settings.referral.accepted.referral_link.referral_link"/>
                                    </p>
                                </Col>

                            </Row>
                            {
                                isLinkEditable ? (
                                    <ReferralLinkEditor
                                        base={base}
                                        code={code}
                                        onChangeLinkEditableState={this._changeLinkEditState}
                                        onUpdateLink={this.props.onUpdateLink}
                                        onChangeRefCode={this.props.onChangeRefCode}
                                    />) : (
                                    <ReferralLinkCopier
                                        link={link}
                                        base={base}
                                        code={code}
                                        onChangeLinkEditableState={this._changeLinkEditState}
                                    />)
                            }

                            <Row className="Assets">
                                <Col sm={12}>
                                    <p>
                                        <FormattedMessage id="settings.referral.accepted.referral_link.assets.you_can"/>
                                        <span> </span>
                                        <a rel="noopener noreferrer"
                                           href="https://bit.ly/spyamz-aff-assets" target="_blank">
                                            <FormattedMessage
                                                id="settings.referral.accepted.referral_link.assets.banner_within_assets"/>
                                        </a> <FormattedMessage
                                        id="settings.referral.accepted.referral_link.assets.without_any_editing"/>
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

ReferralLink.defaultProps = {
    link: '',
    code: '',
    base: '',
}

ReferralLink.propTypes = {
    link: PropTypes.string,
    code: PropTypes.string,
    base: PropTypes.string,
    onUpdateLink: PropTypes.func.isRequired,
    onChangeRefCode: PropTypes.func.isRequired,
}

export default ReferralLink
