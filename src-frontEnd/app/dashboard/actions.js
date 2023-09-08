import {TOGGLE_COLLAPSE_SIDEBAR, CLOSE_LIMITED_OFFER, OPEN_LIMITED_OFFER,TOGGLE_UPGRADE_POPUP, HIDE_OFFER} from "./actionTypes";

export const toggleCollapseSidebar = () => dispatch => {
    dispatch({
        type: TOGGLE_COLLAPSE_SIDEBAR
    });
};
export const openLimitedOffer = () => dispatch => {
    dispatch({
        type: OPEN_LIMITED_OFFER,
    });
};

export const closeLimitedOffer = () => dispatch => {
    dispatch({
        type: CLOSE_LIMITED_OFFER
    });
};

export const toggleUpgradePopup = () => dispatch => {
    dispatch({
        type: TOGGLE_UPGRADE_POPUP
    });
};

export const hideOffer = () => dispatch => {
    dispatch({
        type: HIDE_OFFER
    });
};
