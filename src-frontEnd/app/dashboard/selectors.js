import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getModule = (state) => {
    return state.get(NAME);
};

export const isOpenSidebar = createSelector(getModule, (state) => {
    return state.get('openSidebar');
});

export const hideOffer = createSelector(getModule, (state) => {
    return state.get('hideOffer');
});
export const isOpenPopupLimitedOffer = createSelector(getModule, state => state.get('isOpenLimitedOffer'));

export const openUpgradePopup = createSelector(getModule, state => state.get('openUpgradePopup'))