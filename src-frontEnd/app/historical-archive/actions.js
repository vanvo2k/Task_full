import {
    HISTORY_CHANGE_FIELD_NAME_SORT_BY,
    HISTORY_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
    HISTORY_CHANGE_PAGINATION_ITEMS_PER_PAGE,
    HISTORY_CHANGE_SEARCH_ITEMS_QUERY, HISTORY_CHANGE_SELECT_BRAND_TYPE_ITEM,
    HISTORY_CHANGE_SELECT_TYPE_ITEM,
    HISTORY_CHANGE_TEMP_FILTER_PRICE,
    HISTORY_CHANGE_TEMP_FILTER_RANK,
    HISTORY_CHANGE_TEMP_FILTER_HISTORICAL_DAY,
    HISTORY_CHANGE_TEMP_FILTER_TIME_AVAILABLE,
    HISTORY_CLOSE_MODAL_ITEM_DETAIL,
    HISTORY_FETCH_ITEM_DETAIL_FAILURE,
    HISTORY_FETCH_ITEM_DETAIL_REQUEST,
    HISTORY_FETCH_ITEM_DETAIL_SUCCESS,
    HISTORY_FETCH_LIST_ITEMS_FAILURE,
    HISTORY_FETCH_LIST_ITEMS_REQUEST,
    HISTORY_FETCH_LIST_ITEMS_SUCCESS,
    HISTORY_INIT_SETUP_META,
    HISTORY_OPEN_EDITOR_FILTER_PRICE,
    HISTORY_OPEN_EDITOR_FILTER_RANK,
    HISTORY_OPEN_EDITOR_FILTER_HISTORICAL_DAY,
    HISTORY_OPEN_EDITOR_FILTER_TIME_AVAILABLE,
    HISTORY_SHOW_ITEM_DETAIL,
    HISTORY_SUBMIT_FILTER_PRICE,
    HISTORY_SUBMIT_FILTER_RANK,
    HISTORY_SUBMIT_FILTER_TIME_AVAILABLE,
    HISTORY_SWITCH_LAYOUT_PRODUCTS,
    HISTORY_SUBMIT_FILTER_HISTORICAL_DAY,
    HISTORY_TOGGLE_EDITOR_FILTER_PRICE,
    HISTORY_TOGGLE_EDITOR_FILTER_RANK,
    HISTORY_TOGGLE_EDITOR_FILTER_HISTORICAL_DAY,
    HISTORY_TOGGLE_EDITOR_FILTER_TIME_AVAILABLE
} from "./actionTypes";
import {changeQuerySearch, parseSearchQuery} from "../../helpers/RouterHelper";
import {getMetaListItems, getPaginationControlData} from "./selectors";
import moment from "moment";
import {logEvent} from "../../helpers/AnalyticsHelpers";
import {showNotify} from "../notify-modal/actions";
import isEmpty from "lodash/isEmpty";
import parsePastTime from "../../helpers/time/parsePastTime";
import isBetaVersion from "../../helpers/common/isBetaVersion";
import {makeRequest} from "../../services/ws/WSSerivces";
import {detectASIN} from "../../helpers/AmazonHelpers";
import {_searchArchiveProducts, _getProductDetail} from "../../services/ArchiveServices";
import parsePastTimeFromADate from "../../helpers/time/parsePastTimeFromADate";

export const receiveProducts = (result) => (dispatch) => {
    const {error} = result;

    if (error) {
        dispatch({
            type: HISTORY_FETCH_LIST_ITEMS_FAILURE,
            error,
            enableLoadingBar: true
        });
    } else {
        dispatch({
            type: HISTORY_FETCH_LIST_ITEMS_SUCCESS,
            result,
            enableLoadingBar: true
        });
    }

    return Promise.resolve(true);
};

export const fetchItems = () => (dispatch, getState) => {
    const state = getState();

    const metaData = getMetaListItems(state);
    const paginationData = getPaginationControlData(state);

    const query = metaData.get('query').toJS();
    const {page, perPage} = paginationData.toJS();
    const rank = metaData.get('rank');
    const price = metaData.get('price');
    const sortBy = metaData.get('sortBy').toJS();
    const currentRank = rank.get('current').toJS();
    const currentPrice = price.get('current').toJS();
    const type = metaData.get('type');
    const brandType = metaData.get('brandType');

    const historicalDay = metaData.getIn(['historical', 'current']).toJS();
    const {date} = historicalDay;
    const dateMoment = moment(date, 'DD-MM-YYYY');
    const dateText = dateMoment.format('DD-MM-YYYY') ;

    const available = metaData.getIn(['available', 'current']).toJS();
    const {from, to} = available;
    const fromMoment = moment(from, 'DD-MM-YYYY');
    const toMoment = moment(to, 'DD-MM-YYYY');
    const fromPastTime = parsePastTimeFromADate(from, dateText);
    const toPastTime = parsePastTimeFromADate(to, dateText);
    const fromText = fromPastTime ? from : (fromMoment.isValid() ? fromMoment.format('DD/MM/YYYY') : from);
    const toText = toPastTime ? to : (toMoment.isValid() ? toMoment.format('DD/MM/YYYY') : to);

    const category = 'clothing';

    let args = {}

    const isASIN = detectASIN(query.term);
    if (isASIN) {
        args = Object.assign({limit: 10, page: 1, query: {}}, {
            page,
            limit: perPage,
            query,
            dateText
        })
    } else {
        args = Object.assign({limit: 10, page: 1, query: {}}, {
            page,
            query,
            limit: perPage,
            rank: {
                from: currentRank.from ? currentRank.from : 1,
                to: currentRank.to ? currentRank.to : 0
            },
            price: currentPrice,
            sortBy,
            type: type ? type : '',
            category,
            brandType,
            availableText: {from: fromText, to: toText},
            dateText,
        });
    }

    logEvent({
        category: 'ITEMS',
        action: 'Search items'
    });

    dispatch({
        type: HISTORY_FETCH_LIST_ITEMS_REQUEST,
        enableLoadingBar: true
    });

    const start = Date.now();

    if (isBetaVersion()) {
        return makeRequest('/sp_', args)
            .then(result => {
                dispatch({
                    type: HISTORY_FETCH_LIST_ITEMS_SUCCESS,
                    result,
                    enableLoadingBar: true
                });

                console.log('REALTIME', Date.now() - start);

                return Promise.resolve(true);
            })
            .catch(error => {
                dispatch({
                    type: HISTORY_FETCH_LIST_ITEMS_FAILURE,
                    error,
                    enableLoadingBar: true
                });

                return Promise.resolve(true);
            });
    }

    return _searchArchiveProducts(args)
        .then(result => {
            console.log('HTTP', Date.now() - start);

            const {notify, data} = result;
            if (notify) {
                const message = result.message || '';
                const upgradePlan = result.upgradePlan || false;
                const refresh = result.refresh || false;

                showNotify({
                    content: message,
                    upgradePlan,
                    refresh,
                    data
                })(dispatch);
            }

            dispatch({
                type: HISTORY_FETCH_LIST_ITEMS_SUCCESS,
                result,
                enableLoadingBar: true
            });

            return Promise.resolve(result);
        })
        .catch(error => {
            dispatch({
                type: HISTORY_FETCH_LIST_ITEMS_FAILURE,
                error,
                enableLoadingBar: true
            });

            return Promise.resolve();
        });
};

export const fetchItemDetail = (productId, historicalDate) => {
    return {
        types: [HISTORY_FETCH_ITEM_DETAIL_REQUEST, HISTORY_FETCH_ITEM_DETAIL_SUCCESS, HISTORY_FETCH_ITEM_DETAIL_FAILURE],
        promise: _getProductDetail(productId, historicalDate),
        productId,
    };
};

export const changePaginationNumber = (page, history = null) => dispatch => {
    const pageValidated = page > 0 ? page : 1;

    if (history) {
        changeQuerySearch(history)({page: pageValidated});
    }

    dispatch({
        type: HISTORY_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
        page: pageValidated
    });

    return Promise.resolve(pageValidated);
};

export const changePaginationPerPage = (number) => dispatch => {
    dispatch({
        type: HISTORY_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
        page: 1
    });

    dispatch({
        type: HISTORY_CHANGE_PAGINATION_ITEMS_PER_PAGE,
        number
    });

    return Promise.resolve(number);
};

export const initCheckQuerySearch = (history) => dispatch => {
    dispatch({
        type: HISTORY_INIT_SETUP_META
    });

    const query = parseSearchQuery(history);
    if (isEmpty(query)) {
        return Promise.resolve(query);
    }

    const {page, from, to, sortByField, type, fromP, toP, brandType, date, fromA, toA} = query;

    const historicalDay = moment(date, 'DD-MM-YYYY').isValid() || parsePastTime(date) ? date : null;

    const fromAvailable = moment(fromA, 'DD-MM-YYYY').isValid() || parsePastTimeFromADate(fromA, date) ? fromA : null;
    const toAvailable = moment(toA, 'DD-MM-YYYY').isValid() || parsePastTimeFromADate(toA, date) ? toA : null;

    const fromPrice = fromP ? parseInt(fromP, 10) : 0;
    const toPrice = toP ? parseInt(toP, 10) : 0;

    if (page && !isNaN(page)) {
        dispatch({
            type: HISTORY_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
            page: parseInt(page, 10)
        });
    }

    if (type) {
        dispatch({
            type: HISTORY_CHANGE_SELECT_TYPE_ITEM,
            typeItem: type
        });
    }

    if (brandType) {
        dispatch({
            type: HISTORY_CHANGE_SELECT_BRAND_TYPE_ITEM,
            brandType,
        });
    }

    if (sortByField) {
        dispatch({
            type: HISTORY_CHANGE_FIELD_NAME_SORT_BY,
            field: sortByField
        });
    }

    dispatch({
        type: HISTORY_CHANGE_TEMP_FILTER_HISTORICAL_DAY,
        data: {
            date: historicalDay
        }
    })

    dispatch({
        type: HISTORY_SUBMIT_FILTER_HISTORICAL_DAY
    })

    dispatch({
        type: HISTORY_CHANGE_TEMP_FILTER_TIME_AVAILABLE,
        data: {
            from: fromAvailable,
            to: toAvailable
        }
    })

    dispatch({
        type: HISTORY_SUBMIT_FILTER_TIME_AVAILABLE
    })

    dispatch({
        type: HISTORY_CHANGE_TEMP_FILTER_RANK,
        data: {from, to}
    });

    dispatch({
        type: HISTORY_SUBMIT_FILTER_RANK
    });

    dispatch({
        type: HISTORY_CHANGE_TEMP_FILTER_PRICE,
        data: {
            from: fromPrice,
            to: toPrice
        }
    });

    dispatch({
        type: HISTORY_SUBMIT_FILTER_PRICE
    });

    const {term, excludedKeyword, searchType} = query;
    dispatch({
        type: HISTORY_CHANGE_SEARCH_ITEMS_QUERY,
        query: {
            term,
            excludedKeyword,
            searchType
        }
    });

    return Promise.resolve(query);
};

export const changeSearchItemsQuery = (query) => dispatch => {
    dispatch({
        type: HISTORY_CHANGE_SEARCH_ITEMS_QUERY,
        query
    });

    return Promise.resolve(query);
};

export const showItemDetail = ({id, index, historicalDay}) => dispatch => {
    dispatch({
        type: HISTORY_SHOW_ITEM_DETAIL,
        data: {id, index}
    });

    return dispatch(fetchItemDetail(id, historicalDay));
};

export const closeModalItemDetail = () => dispatch => {
    dispatch({
        type: HISTORY_CLOSE_MODAL_ITEM_DETAIL
    });

    return Promise.resolve();
};

export const submitFilterRank = () => dispatch => {
    dispatch({
        type: HISTORY_SUBMIT_FILTER_RANK
    });

    return Promise.resolve();
};

export const changeTempFilterRank = (data) => dispatch => {
    const {from, to} = data.toJS();

    dispatch({
        type: HISTORY_CHANGE_TEMP_FILTER_RANK,
        data: {from, to}
    });

    return Promise.resolve();
};

export const openEditFilterRank = () => dispatch => {
    dispatch({
        type: HISTORY_OPEN_EDITOR_FILTER_RANK
    });

    return Promise.resolve();
};

export const toggleEditFilterRank = () => dispatch => {
    dispatch({
        type: HISTORY_TOGGLE_EDITOR_FILTER_RANK
    });

    return Promise.resolve();
};

/**
 * Filter historical day
 */
export const openEditFilterHistoricalDay = () => dispatch => {
    dispatch({
        type: HISTORY_OPEN_EDITOR_FILTER_HISTORICAL_DAY
    });

    return Promise.resolve();
};

export const toggleEditFilterHistoricalDay = () => dispatch => {
    dispatch({
        type: HISTORY_TOGGLE_EDITOR_FILTER_HISTORICAL_DAY
    });

    return Promise.resolve();
};

export const submitFilterHistoricalDay = (data) => dispatch => {
    dispatch({
        type: HISTORY_SUBMIT_FILTER_HISTORICAL_DAY,
        data
    });

    return Promise.resolve();
};

export const changeTempFilterHistoricalDay = (data) => dispatch => {
    dispatch({
        type: HISTORY_CHANGE_TEMP_FILTER_HISTORICAL_DAY,
        data
    });

    return Promise.resolve();
};

export const changeFieldNameSortBy = (field) => dispatch => {
    dispatch({
        type: HISTORY_CHANGE_FIELD_NAME_SORT_BY,
        field
    });

    return Promise.resolve(field);
};

export const changeSelectTypeItem = (type) => dispatch => {
    dispatch({
        type: HISTORY_CHANGE_SELECT_TYPE_ITEM,
        typeItem: type
    });

    return Promise.resolve(type);
};

export const changeSelectBrandTypeItem = (type) => dispatch => {
    dispatch({
        type: HISTORY_CHANGE_SELECT_BRAND_TYPE_ITEM,
        brandType: type
    });

    return Promise.resolve(type);
};

/**
 * Filter price
 */
export const openEditFilterPrice = () => dispatch => {
    dispatch({
        type: HISTORY_OPEN_EDITOR_FILTER_PRICE
    });

    return Promise.resolve();
};

export const toggleEditFilterPrice = () => dispatch => {
    dispatch({
        type: HISTORY_TOGGLE_EDITOR_FILTER_PRICE
    });

    return Promise.resolve();
};

export const submitFilterPrice = () => dispatch => {
    dispatch({
        type: HISTORY_SUBMIT_FILTER_PRICE
    });

    return Promise.resolve();
};

export const changeTempFilterPrice = (data) => dispatch => {
    const {from, to} = data.toJS();

    dispatch({
        type: HISTORY_CHANGE_TEMP_FILTER_PRICE,
        data: {from, to}
    });

    return Promise.resolve();
};

export const switchLayout = (layout) => dispatch => {
    dispatch({
        type: HISTORY_SWITCH_LAYOUT_PRODUCTS,
        layout
    });

    return Promise.resolve(layout);
};

/**
 * Filter time available
 */
export const openEditFilterTimeAvailable = () => dispatch => {
    dispatch({
        type: HISTORY_OPEN_EDITOR_FILTER_TIME_AVAILABLE
    });

    return Promise.resolve();
};

export const toggleEditFilterTimeAvailable = () => dispatch => {
    dispatch({
        type: HISTORY_TOGGLE_EDITOR_FILTER_TIME_AVAILABLE
    });

    return Promise.resolve();
};

export const submitFilterTimeAvailable = (data) => dispatch => {
    dispatch({
        type: HISTORY_SUBMIT_FILTER_TIME_AVAILABLE,
        data
    });

    return Promise.resolve();
};

export const changeTempFilterTimeAvailable = (data) => dispatch => {
    dispatch({
        type: HISTORY_CHANGE_TEMP_FILTER_TIME_AVAILABLE,
        data
    });

    return Promise.resolve();
};