import {createSelector} from "reselect";
import {NAME} from "./constants";
import {getSettings} from "../selectors";

export const getModule = (state) => {
    return state.get(NAME);
};

export const getSettingsProfile = createSelector(getSettings, getModule);