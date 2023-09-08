import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getModule = (state) => {
    return state.get(NAME);
};

export const isOpen = createSelector(getModule, state => state.get('isOpen'));
export const getListErrors = createSelector(getModule, state => state.get('errors'));
export const getLastError = createSelector(getListErrors, state => state.get(-1));
export const getCountError = createSelector(getModule, state => state.get('countError'));
