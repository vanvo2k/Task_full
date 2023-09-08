import {createSelector} from "reselect";
import {NAME} from "./constants";
import {getRootModule} from "../selectors";

export const getModule = createSelector(getRootModule, state => state.get(NAME));

export const getAvailableStatistic = createSelector(getModule, state => state.get('availableStatistic'));

export const gethasRankStatistic = createSelector(getModule, state => state.get('hasRankStatistic'));

export const getShowDays = createSelector(getModule, state => state.get('showDays'));

export const getLoading = createSelector(getModule, state => state.get('loading'));