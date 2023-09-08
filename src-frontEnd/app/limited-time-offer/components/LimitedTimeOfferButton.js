import React, {Component} from "react";
import {connect} from "react-redux";
import {hideOffer, isOpenPopupLimitedOffer} from "../../dashboard/selectors";
import { openLimitedOffer } from "../../dashboard/actions";
class LimitedTimeOfferButton extends Component {

    _openLimitedOfferModal = () => {
        this.props.openLimitedOffer()
    }

    render() {
        const {isOpenLimitedOffer} = this.props
        return (
            <div className="LimitedTimeOfferButton">
                {
                    !isOpenLimitedOffer && <a onClick={this._openLimitedOfferModal}>
                        {/* <video preload="none" playsInline autoPlay muted loop width="80" height="80">
                            <source src="/assets/images/giftbox.mp4" type="video/mp4"/>
                        </video> */}
                        <img src="/assets/images/giftbox.gif" alt="box"/>
                    </a>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    isOpenLimitedOffer: isOpenPopupLimitedOffer(state),
});

const mapDispatchToProps = {
    openLimitedOffer,
};


export default connect(mapStateToProps, mapDispatchToProps)(LimitedTimeOfferButton);
