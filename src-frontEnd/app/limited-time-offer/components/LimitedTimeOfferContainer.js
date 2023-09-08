import React, {Component} from "react";
import classNames from "classnames";
import {connect} from "react-redux";
import { Button, Form, FormGroup, Input, Modal, ModalBody } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { isOpenPopupLimitedOffer } from "../../dashboard/selectors";
import {closeLimitedOffer, hideOffer} from "../../dashboard/actions";
import LimitedTimeOfferCountdown from "./LimitedTimeOfferCountdown";
import {getProfileData} from "../../../selectors/UserSelectors";
import {saveUserPhoneNumber} from "../../../services/UserService";
import StorageServices from "../../../services/StorageServices";
import moment from "moment";

class LimitedTimeOfferContainer extends Component {

    state = {
        phoneNumber: '',
        userProfile: {}
    }

    componentDidMount() {
        const {profile} = this.props
        const userProfile = profile.toJS()
        userProfile.firstShowPromotionTime = moment(userProfile.firstShowPromotionTime).add(14, 'days')
        this.setState({userProfile})
    }

    _handleClosePopup = () => {
        this.props.closeLimitedOffer();
    }

    _handleChangePhone = (e) => {
        const {value} = e.target
        this.setState({phoneNumber: value})
    }

    _handleSubmitForm = async (e) => {
        try {
            e.preventDefault();
            const payload = {
                phoneNumber: this.state.phoneNumber,
            }
            const {success,message} = await saveUserPhoneNumber(payload)
            if (!success) {
                throw new Error(message)
            }
            const newProfile = {
                ...this.state.userProfile,
                phoneNumber: this.state.phoneNumber
            }
            StorageServices.updateUserProfile({profile: newProfile})
            this._completeOffer()
        } catch(error) {
            console.log(error)
        }
    }

    _completeOffer = () => {
        // this.props.hideOffer()
        StorageServices.set('limitedOfferStatus', 'closed')
        this._handleClosePopup()
    }

    render() {
        const {userProfile, phoneNumber} = this.state
        const {props} = this;
        const {isOpenLimitedOffer} = props
        return (
            <div className={classNames("LimitedTimeOffer", {isOpenLimitedOffer})}>
                <Modal size="lg" className="ModalLimitedTimeOffer" toggle={this._handleClosePopup} isOpen={isOpenLimitedOffer} centered>
                    <span onClick={this._handleClosePopup} className="Close"><i className="linear-cross"/></span>
                    <div className="BonusImage">
                        <img src="/assets/images/bonus.png" alt="" />
                    </div>
                    <ModalBody>
                        <h2><FormattedMessage id={`limit_offer.header.title`}/></h2>
                        <p className="m-0"><FormattedMessage id={`limit_offer.header.description`}/></p>
                        <div className="LimitedTimeOfferForm">
                            <div className="OfferBenefit">
                                <ul>
                                    <li><FormattedMessage id={`limit_offer.list_gift.gift_1`}/></li>
                                    <li><FormattedMessage id={`limit_offer.list_gift.gift_2`}/></li>
                                    <li><FormattedMessage id={`limit_offer.list_gift.gift_3`}/></li>
                                </ul>
                                <div className="OfferGallery">
                                    <img src="/assets/images/image-1.png" alt="" />
                                    <img src="/assets/images/image-2.png" alt="" />
                                    <img src="/assets/images/image-3.png" alt="" />
                                    <img src="/assets/images/image-4.png" alt="" />
                                </div>
                            </div>
                            <div className="OfferForm">
                                <div className="OfferFormBackground"></div>
                                <Form>
                                    <FormGroup>
                                        <label><FormattedMessage id="limit_offer.form.email"/></label>
                                        <Input type="text" value={userProfile.email || ''} readOnly />
                                    </FormGroup>

                                    <FormGroup>
                                        <label><FormattedMessage id="limit_offer.form.phone"/><span className="text-danger">*</span></label>
                                        <Input type="text" value={phoneNumber} onChange={this._handleChangePhone} required />
                                    </FormGroup>
                                    <Button type="submit" className="btn-submit" onClick={this._handleSubmitForm}>
                                        <FormattedMessage id="limit_offer.form.button"/>
                                    </Button>
                                </Form>
                            </div>
                        </div>
                        {
                            userProfile.firstShowPromotionTime &&
                            <div className="OfferCountdown">
                                <div className="OfferTitle">
                                    <span><FormattedMessage id={`limit_offer.countdown.title`}/></span>
                                </div>
                                <LimitedTimeOfferCountdown
                                    date={moment(userProfile.firstShowPromotionTime).valueOf()}
                                    completedCallback={null} />
                            </div>
                        }
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    isOpenLimitedOffer: isOpenPopupLimitedOffer(state),
    profile: getProfileData(state),
});

const mapDispatchToProps = {
    closeLimitedOffer,
};

export default connect(mapStateToProps, mapDispatchToProps)(LimitedTimeOfferContainer);
