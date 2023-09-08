import {createSelector} from "reselect";
import {Map} from "immutable";
import {getState} from "../reducers/app";

export const getAppData = createSelector(getState, appData => appData);

export const getNewAppData = createSelector(getAppData, appData => appData.get('new') || Map());

export const getOldAppData = createSelector(getAppData, appData => appData.get('old') || Map());


