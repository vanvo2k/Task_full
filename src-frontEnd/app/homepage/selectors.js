import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getRootModule = (state) => state.get(NAME);

export const getModule = createSelector(getRootModule, state => state.get(NAME));

export const getTotalItems = createSelector(getModule, (state) => {
    return state.get('totalItems');
});