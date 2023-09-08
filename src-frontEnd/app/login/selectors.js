import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getModule = (state) => {
    return state.get(NAME);
};

export const getMessageError = createSelector(getModule, state => state.get('message'));
export const getLoadingLogin = createSelector(getModule, state => state.get('loading'));