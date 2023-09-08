import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {TOGGLE_COLLAPSE_SIDEBAR, CLOSE_LIMITED_OFFER, OPEN_LIMITED_OFFER,TOGGLE_UPGRADE_POPUP, HIDE_OFFER} from "./actionTypes";
import {hideOffer} from "./actions";

const initRootState = {
    openSidebar: true,
    isOpenLimitedOffer: false,
    countDown: 0,
    showOffer: true,
    openUpgradePopup:false,
};

export default createReducer(fromJS(initRootState), {
    [TOGGLE_COLLAPSE_SIDEBAR](state, action) {
        const current = state.get('openSidebar');

        return state.set('openSidebar', !current);
    },
    [HIDE_OFFER](state, action) {
        return state.set('showOffer', false)
    },
    [OPEN_LIMITED_OFFER](state, action) {
        return state.set('isOpenLimitedOffer', true)
    },
    [TOGGLE_UPGRADE_POPUP](state, action) {
        const current = state.get('openUpgradePopup');
        return state.set('openUpgradePopup', !current)
    },
    [CLOSE_LIMITED_OFFER](state, action) {
        return state.set('isOpenLimitedOffer', false)
    },
});
