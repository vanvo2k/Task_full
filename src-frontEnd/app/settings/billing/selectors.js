import {createSelector} from "reselect";
import {NAME} from "./constants";
import {getSettings} from "../selectors";

export const getModule = (state) => {
    return state.get(NAME);
};

export const getSettingsBilling = createSelector(getSettings, getModule);

export const getBillHistory = createSelector(getSettingsBilling, (state) => {
    return state.get('history');
});

export const getCurrentMembership = createSelector(getSettingsBilling, (state) => {
    return state.get('membership');
});