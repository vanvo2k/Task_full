import {createSelector} from "reselect";
import {NAME} from "./constants";
import {getRootModule} from "../selectors";

export const getModule = createSelector(getRootModule, state => state.get(NAME));

export const getUpdateStatistic = createSelector(getModule, state => state.get('updateStatistic'));

export const getLoading = createSelector(getModule, state => state.get('loading'));