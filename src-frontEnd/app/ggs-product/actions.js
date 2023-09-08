import {
    GGS_CHANGE_FIELD_NAME_SORT_BY,
    GGS_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
    GGS_CHANGE_PAGINATION_ITEMS_PER_PAGE,
    GGS_CHANGE_SEARCH_ITEMS_QUERY,
    GGS_CHANGE_SELECT_BRAND_TYPE_ITEM,
    GGS_CHANGE_SELECT_MARKET_ITEM,
    GGS_CHANGE_SELECT_STATUS_ITEMS,
    GGS_CHANGE_SELECT_TYPE_ITEM, GGS_CHANGE_TEMP_FILTER_MAX_PRICE,
    GGS_CHANGE_TEMP_FILTER_MIN_PRICE,
    GGS_CHANGE_TEMP_FILTER_PRICE,
    GGS_CHANGE_TEMP_FILTER_RANK,
    GGS_CHANGE_TEMP_FILTER_TIME_AVAILABLE,
    GGS_CLOSE_MODAL_ITEM_DETAIL,
    GGS_FETCH_ITEM_DETAIL_FAILURE,
    GGS_FETCH_ITEM_DETAIL_REQUEST,
    GGS_FETCH_ITEM_DETAIL_SUCCESS,
    GGS_FETCH_LIST_ITEMS_FAILURE,
    GGS_FETCH_LIST_ITEMS_REQUEST,
    GGS_FETCH_LIST_ITEMS_SUCCESS,
    GGS_FETCH_TOTAL_ITEMS_FAILURE,
    GGS_FETCH_TOTAL_ITEMS_REQUEST,
    GGS_FETCH_TOTAL_ITEMS_SUCCESS,
    GGS_INIT_SETUP_META,
    GGS_OPEN_EDITOR_FILTER_MAX_PRICE,
    GGS_OPEN_EDITOR_FILTER_MIN_PRICE,
    GGS_OPEN_EDITOR_FILTER_PRICE,
    GGS_OPEN_EDITOR_FILTER_RANK,
    GGS_OPEN_EDITOR_FILTER_TIME_AVAILABLE,
    GGS_SHOW_ITEM_DETAIL, GGS_SUBMIT_FILTER_MAX_PRICE,
    GGS_SUBMIT_FILTER_MIN_PRICE,
    GGS_SUBMIT_FILTER_PRICE,
    GGS_SUBMIT_FILTER_RANK,
    GGS_SUBMIT_FILTER_TIME_AVAILABLE,
    GGS_SWITCH_LAYOUT_PRODUCTS,
    GGS_TOGGLE_EDITOR_FILTER_MAX_PRICE,
    GGS_TOGGLE_EDITOR_FILTER_MIN_PRICE,
    GGS_TOGGLE_EDITOR_FILTER_PRICE,
    GGS_TOGGLE_EDITOR_FILTER_RANK,
    GGS_TOGGLE_EDITOR_FILTER_TIME_AVAILABLE,
    GGS_TOGGLE_LIKE_ITEM_FAILURE,
    GGS_TOGGLE_LIKE_ITEM_REQUEST,
    GGS_TOGGLE_LIKE_ITEM_SUCCESS
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
import {
    _getGgsProductDetail,
    _getTotalGgsProducts,
    _searchGgsProducts,
    _toggleLikeGgsProduct
} from "../../services/GgsProductServices";

export const receiveProducts = (result) => (dispatch) => {
    const {error} = result;

    if (error) {
        dispatch({
            type: GGS_FETCH_LIST_ITEMS_FAILURE,
            error,
            enableLoadingBar: true
        });
    } else {
        dispatch({
            type: GGS_FETCH_LIST_ITEMS_SUCCESS,
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
    const status = metaData.get('selectStatus');
    const {page, perPage} = paginationData.toJS();
    const rank = metaData.get('rank');
    // const price = metaData.get('price');
    // const currentPrice = price.get('current').toJS();
    const minPrice = metaData.get('minPrice');
    const currentMinPrice = minPrice.get('current').toJS();
    const maxPrice = metaData.get('maxPrice');
    const currentMaxPrice = maxPrice.get('current').toJS();
    const sortBy = metaData.get('sortBy').toJS();
    const currentRank = rank.get('current').toJS();
    const type = metaData.get('type');
    const brandType = metaData.get('brandType');
    const market = metaData.get('selectMarket')

    const available = metaData.getIn(['available', 'current']).toJS();
    const {from, to} = available;
    const fromMoment = moment(from, 'DD-MM-YYYY');
    const toMoment = moment(to, 'DD-MM-YYYY');
    const fromPastTime = parsePastTime(from);
    const toPastTime = parsePastTime(to);
    const fromText = fromPastTime ? from : (fromMoment.isValid() ? fromMoment.format('DD/MM/YYYY') : from);
    const toText = toPastTime ? to : (toMoment.isValid() ? toMoment.format('DD/MM/YYYY') : to);

    const category = 'clothing';
    let args = {}

    const {term} = query
    if (detectASIN(term)) {
        args = Object.assign({limit: 10, page: 1, query: {}}, {
            page,
            query,
            limit: perPage,
            market
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
            minPrice: currentMinPrice,
            maxPrice: currentMaxPrice,
            status,
            sortBy,
            type,
            category,
            brandType,
            availableText: {from: fromText, to: toText},
            market
        });
    }
    logEvent({
        category: 'ITEMS',
        action: 'Search items'
    });

    dispatch({
        type: GGS_FETCH_LIST_ITEMS_REQUEST,
        enableLoadingBar: true
    });

    const start = Date.now();

    if (isBetaVersion()) {
        return makeRequest('/sp_', args)
            .then(result => {
                dispatch({
                    type: GGS_FETCH_LIST_ITEMS_SUCCESS,
                    result,
                    enableLoadingBar: true
                });

                console.log('REALTIME', Date.now() - start);

                return Promise.resolve(true);
            })
            .catch(error => {
                dispatch({
                    type: GGS_FETCH_LIST_ITEMS_FAILURE,
                    error,
                    enableLoadingBar: true
                });

                return Promise.resolve(true);
            });
    }

    return _searchGgsProducts(args)
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
                type: GGS_FETCH_LIST_ITEMS_SUCCESS,
                result,
                enableLoadingBar: true
            });

            return Promise.resolve(result);
        })
        .catch(error => {
            dispatch({
                type: GGS_FETCH_LIST_ITEMS_FAILURE,
                error,
                enableLoadingBar: true
            });

            return Promise.resolve();
        });
};

export const fetchItemDetail = (productId) => {
    return {
        types: [GGS_FETCH_ITEM_DETAIL_REQUEST, GGS_FETCH_ITEM_DETAIL_SUCCESS, GGS_FETCH_ITEM_DETAIL_FAILURE],
        promise: _getGgsProductDetail(productId),
        productId,
    };
};

export const fetchTotalItems = (s = '') => {
    return {
        promise: _getTotalGgsProducts(s),
        types: [GGS_FETCH_TOTAL_ITEMS_REQUEST, GGS_FETCH_TOTAL_ITEMS_SUCCESS, GGS_FETCH_TOTAL_ITEMS_FAILURE]
    }
};

export const changePaginationNumber = (page, history = null) => dispatch => {
    const pageValidated = page > 0 ? page : 1;

    if (history) {
        changeQuerySearch(history)({page: pageValidated});
    }

    dispatch({
        type: GGS_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
        page: pageValidated
    });

    return Promise.resolve(pageValidated);
};

export const changePaginationPerPage = (number) => dispatch => {
    dispatch({
        type: GGS_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
        page: 1
    });

    dispatch({
        type: GGS_CHANGE_PAGINATION_ITEMS_PER_PAGE,
        number
    });

    return Promise.resolve(number);
};

export const initCheckQuerySearch = (history) => dispatch => {
    dispatch({
        type: GGS_INIT_SETUP_META
    });

    const query = parseSearchQuery(history);
    if (isEmpty(query)) {
        return Promise.resolve(query);
    }

    const {page, from, to, fromA, toA, sortByField, type, status, fromMinP, toMinP, fromMaxP, toMaxP, brandType, market} = query;

    const fromAvailable = moment(fromA, 'DD-MM-YYYY').isValid() || parsePastTime(fromA) ? fromA : null;
    const toAvailable = moment(toA, 'DD-MM-YYYY').isValid() || parsePastTime(toA) ? toA : null;

    const fromMinPrice = fromMinP ? parseInt(fromMinP, 10) : 0;
    const toMinPrice = toMinP ? parseInt(toMinP, 10) : 0;

    const fromMaxPrice = fromMaxP ? parseInt(fromMaxP, 10) : 0;
    const toMaxPrice = toMaxP ? parseInt(toMaxP, 10) : 0;

    if (page && !isNaN(page)) {
        dispatch({
            type: GGS_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
            page: parseInt(page, 10)
        });
    }

    if (status) {
        dispatch({
            type: GGS_CHANGE_SELECT_STATUS_ITEMS,
            status
        });
    }

    if (type) {
        dispatch({
            type: GGS_CHANGE_SELECT_TYPE_ITEM,
            typeItem: type
        });
    }

    if (market) {
        dispatch({
            type: GGS_CHANGE_SELECT_MARKET_ITEM,
            market
        })
    }

    if (brandType) {
        dispatch({
            type: GGS_CHANGE_SELECT_BRAND_TYPE_ITEM,
            brandType,
        });
    }

    if (sortByField) {
        dispatch({
            type: GGS_CHANGE_FIELD_NAME_SORT_BY,
            field: sortByField
        });
    }

    dispatch({
        type: GGS_CHANGE_TEMP_FILTER_TIME_AVAILABLE,
        data: {
            from: fromAvailable,
            to: toAvailable
        }
    });

    dispatch({
        type: GGS_SUBMIT_FILTER_TIME_AVAILABLE
    });

    dispatch({
        type: GGS_CHANGE_TEMP_FILTER_RANK,
        data: {from, to}
    });

    dispatch({
        type: GGS_SUBMIT_FILTER_RANK
    });

    dispatch({
        type: GGS_CHANGE_TEMP_FILTER_MIN_PRICE,
        data: {
            from: fromMinPrice,
            to: toMinPrice
        }
    });

    dispatch({
        type: GGS_SUBMIT_FILTER_MIN_PRICE
    });

    dispatch({
        type: GGS_CHANGE_TEMP_FILTER_MAX_PRICE,
        data: {
            from: fromMaxPrice,
            to: toMaxPrice
        }
    });

    dispatch({
        type: GGS_SUBMIT_FILTER_MAX_PRICE
    });

    const {term, excludedKeyword, searchType} = query;
    dispatch({
        type: GGS_CHANGE_SEARCH_ITEMS_QUERY,
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
        type: GGS_CHANGE_SEARCH_ITEMS_QUERY,
        query
    });

    return Promise.resolve(query);
};

export const changeSelectStatusItem = (status) => dispatch => {
    dispatch({
        type: GGS_CHANGE_SELECT_STATUS_ITEMS,
        status
    });

    return Promise.resolve(status);
};

export const changeSelectMarketItem = (market) => dispatch => {
    dispatch({
        type: GGS_CHANGE_SELECT_MARKET_ITEM,
        market
    });

    return Promise.resolve(market);
};

export const showItemDetail = ({id, index}) => dispatch => {
    dispatch({
        type: GGS_SHOW_ITEM_DETAIL,
        data: {id, index}
    });

    return dispatch(fetchItemDetail(id));
};

export const closeModalItemDetail = () => dispatch => {
    dispatch({
        type: GGS_CLOSE_MODAL_ITEM_DETAIL
    });

    return Promise.resolve();
};

export const toggleLikeItem = (productId) => {
    return {
        types: [GGS_TOGGLE_LIKE_ITEM_REQUEST, GGS_TOGGLE_LIKE_ITEM_SUCCESS, GGS_TOGGLE_LIKE_ITEM_FAILURE],
        promise: _toggleLikeGgsProduct(productId),
        enableLoadingBar: true
    };
};

export const submitFilterRank = () => dispatch => {
    dispatch({
        type: GGS_SUBMIT_FILTER_RANK
    });

    return Promise.resolve();
};

export const changeTempFilterRank = (data) => dispatch => {
    const {from, to} = data.toJS();

    dispatch({
        type: GGS_CHANGE_TEMP_FILTER_RANK,
        data: {from, to}
    });

    return Promise.resolve();
};

export const openEditFilterRank = () => dispatch => {
    dispatch({
        type: GGS_OPEN_EDITOR_FILTER_RANK
    });

    return Promise.resolve();
};

export const toggleEditFilterRank = () => dispatch => {
    dispatch({
        type: GGS_TOGGLE_EDITOR_FILTER_RANK
    });

    return Promise.resolve();
};

/**
 * Filter time available
 */
export const openEditFilterTimeAvailable = () => dispatch => {
    dispatch({
        type: GGS_OPEN_EDITOR_FILTER_TIME_AVAILABLE
    });

    return Promise.resolve();
};

export const toggleEditFilterTimeAvailable = () => dispatch => {
    dispatch({
        type: GGS_TOGGLE_EDITOR_FILTER_TIME_AVAILABLE
    });

    return Promise.resolve();
};

export const submitFilterTimeAvailable = (data) => dispatch => {
    dispatch({
        type: GGS_SUBMIT_FILTER_TIME_AVAILABLE,
        data
    });

    return Promise.resolve();
};

export const changeTempFilterTimeAvailable = (data) => dispatch => {
    dispatch({
        type: GGS_CHANGE_TEMP_FILTER_TIME_AVAILABLE,
        data
    });

    return Promise.resolve();
};

export const changeFieldNameSortBy = (field) => dispatch => {
    dispatch({
        type: GGS_CHANGE_FIELD_NAME_SORT_BY,
        field
    });

    return Promise.resolve(field);
};

export const changeSelectTypeItem = (type) => dispatch => {
    dispatch({
        type: GGS_CHANGE_SELECT_TYPE_ITEM,
        typeItem: type
    });

    return Promise.resolve(type);
};

export const changeSelectBrandTypeItem = (type) => dispatch => {
    dispatch({
        type: GGS_CHANGE_SELECT_BRAND_TYPE_ITEM,
        brandType: type
    });

    return Promise.resolve(type);
};

/**
 * Filter min price
 */
export const openEditFilterMinPrice = () => dispatch => {
    dispatch({
        type: GGS_OPEN_EDITOR_FILTER_MIN_PRICE
    });

    return Promise.resolve();
};

export const toggleEditFilterMinPrice = () => dispatch => {
    dispatch({
        type: GGS_TOGGLE_EDITOR_FILTER_MIN_PRICE
    });

    return Promise.resolve();
};

export const submitFilterMinPrice = () => dispatch => {
    dispatch({
        type: GGS_SUBMIT_FILTER_MIN_PRICE
    });

    return Promise.resolve();
};

export const changeTempFilterMinPrice = (data) => dispatch => {
    const {from, to} = data.toJS();

    dispatch({
        type: GGS_CHANGE_TEMP_FILTER_MIN_PRICE,
        data: {from, to}
    });

    return Promise.resolve();
};

export const switchLayout = (layout) => dispatch => {
    dispatch({
        type: GGS_SWITCH_LAYOUT_PRODUCTS,
        layout
    });

    return Promise.resolve(layout);
};

/**
 * Filter max price
 */
export const openEditFilterMaxPrice = () => dispatch => {
    dispatch({
        type: GGS_OPEN_EDITOR_FILTER_MAX_PRICE
    });

    return Promise.resolve();
};

export const toggleEditFilterMaxPrice = () => dispatch => {
    dispatch({
        type: GGS_TOGGLE_EDITOR_FILTER_MAX_PRICE
    });

    return Promise.resolve();
};

export const submitFilterMaxPrice = () => dispatch => {
    dispatch({
        type: GGS_SUBMIT_FILTER_MAX_PRICE
    });

    return Promise.resolve();
};

export const changeTempFilterMaxPrice = (data) => dispatch => {
    const {from, to} = data.toJS();

    dispatch({
        type: GGS_CHANGE_TEMP_FILTER_MAX_PRICE,
        data: {from, to}
    });

    return Promise.resolve();
};