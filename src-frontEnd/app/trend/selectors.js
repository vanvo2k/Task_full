import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getModule = (state) => {
    return state.get(NAME);
};

export const _getItemId = (state, props) => props.id;

export const _getItemsData = createSelector(getModule, state => {
    return state.get('items');
});

export const getItemDetail = createSelector([_getItemsData, _getItemId], (state, id) => {
    const byIds = state.get('byIds');

    return byIds.get(id);
});

export const getListItems = createSelector(_getItemsData, (state) => {
    return state.get('allIds');
});

export const getPaginationControlData = createSelector(getModule, (state) => {
    return state.get('pagination');
});

export const getDataModalShowItem = createSelector(getModule, (state) => {
    return state.get('showItem');
});

export const getMetaListItems = createSelector(getModule, (state) => {
    return state.get('meta');
});

export const getFilterRankData = createSelector(getMetaListItems, state => state.get('rank'));