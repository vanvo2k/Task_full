import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getRootModule = (state) => state.get(NAME);

export const getModule = createSelector(getRootModule, state => state.get(NAME));

export const getStatisticRankRanges = createSelector(getModule, state => state.get('rankRanges'));

export const getStatisticItemTypes = createSelector(getModule, state => state.get('itemTypes'));

export const getItemsTopRising = createSelector(getModule, state => state.get('itemsTopRising'));

export const getItemsTopRanking = createSelector(getModule, state => state.get('itemsTopRanking'));

export const getItemsRandom = createSelector(getModule, state => state.get('itemsRandom'));
