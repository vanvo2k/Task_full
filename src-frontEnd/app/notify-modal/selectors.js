import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getModule = (state) => {
    return state.get(NAME);
};

export const getNotifyData = createSelector(getModule, (state) => {
    return state;
});