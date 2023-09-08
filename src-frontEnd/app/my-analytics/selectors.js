import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getModule = (state) => {
    return state.get(NAME);
};

export const getListItems = createSelector(getModule, state => state.get('items'));
export const getLoading = createSelector(getModule, state => state.get('loading'));
export const getPagination = createSelector(getModule, state => state.get('pagination'));