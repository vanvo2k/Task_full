import {createSelector} from "reselect";
import {NAME} from "./constants";
import {isMobile} from "../../services/ViewportServices";

export const getModule = (state) => state.get(NAME);

export const _getItemId = (state, props) => props.id;

export const _getItemsData = createSelector(getModule, state => state.get('items'));

export const isFetchingListItem = createSelector(_getItemsData, state => !!state.get('loading'));

export const getItemDetail = createSelector([_getItemsData, _getItemId], (state, id) => state.getIn(['byIds', id]));

export const getListItems = createSelector(_getItemsData, (state) => state.get('allIds'));

export const getMessageError = createSelector(_getItemsData, (state) => state.get('error'));

export const getPaginationControlData = createSelector(getModule, (state) => state.get('pagination'));

export const getDataModalShowItem = createSelector(getModule, (state) => state.get('showItem'));

export const isOpenShowItem = createSelector(getDataModalShowItem, state => state.get('isOpen'));

export const getMetaListItems = createSelector(getModule, (state) => state.get('meta'));

export const getTotalItems = createSelector(getMetaListItems, (state) => state.get('total'));

export const getTotalSearchItems = createSelector(getPaginationControlData, (state) => state.get('total'));

export const getSearchQuery = createSelector(getMetaListItems, state => state.get('query'));

export const getSearchTermQuery = createSelector(getSearchQuery, state => state.get('term') || '');

export const getSearchExcludedKeywordQuery = createSelector(getSearchQuery, state => state.get('excludedKeyword') || '');

export const getSearchTypeQuery = createSelector(getSearchQuery, state => state.get('searchType') || 'all_words');

export const getFilterType = createSelector(getMetaListItems, state => state.get('type'));

export const getFilterBrandType = createSelector(getMetaListItems, state => state.get('brandType'));

export const getFilterRankData = createSelector(getMetaListItems, state => state.get('rank'));

export const getFilterPriceData = createSelector(getMetaListItems, state => state.get('price'));

export const getFilterSortBy = createSelector(getMetaListItems, state => state.get('sortBy'));

export const getFilterHistoricalDay = createSelector(getMetaListItems, state => state.get('historical'));

export const getFilterTimeAvailableData = createSelector(getMetaListItems, state => state.get('available'));

export const isAdvancedSearch = createSelector(getMetaListItems, state => !!state.get('advancedSearch'));

export const getCurrentLayout = createSelector(getMetaListItems, state => {
    if (isMobile()) {
        return 'grid';
    }

    return state.get('layout');
});


