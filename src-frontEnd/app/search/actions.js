import {
    CHANGE_FIELD_NAME_SORT_BY,
    CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
    CHANGE_PAGINATION_ITEMS_PER_PAGE,
    CHANGE_SEARCH_ITEMS_QUERY, CHANGE_SELECT_BRAND_TYPE_ITEM, CHANGE_SELECT_MARKET_ITEM,
    CHANGE_SELECT_STATUS_ITEMS,
    CHANGE_SELECT_TYPE_ITEM,
    CHANGE_TEMP_FILTER_PRICE,
    CHANGE_TEMP_FILTER_RANK,
    CHANGE_TEMP_FILTER_TIME_AVAILABLE,
    CLOSE_MODAL_ITEM_DETAIL,
    FETCH_ITEM_DETAIL_FAILURE,
    FETCH_ITEM_DETAIL_REQUEST,
    FETCH_ITEM_DETAIL_SUCCESS,
    FETCH_LIST_ITEMS_FAILURE,
    FETCH_LIST_ITEMS_REQUEST,
    FETCH_LIST_ITEMS_SUCCESS,
    FETCH_TOTAL_ITEMS_FAILURE,
    FETCH_TOTAL_ITEMS_REQUEST,
    FETCH_TOTAL_ITEMS_SUCCESS,
    INIT_SETUP_META,
    OPEN_EDITOR_FILTER_PRICE,
    OPEN_EDITOR_FILTER_RANK,
    OPEN_EDITOR_FILTER_TIME_AVAILABLE,
    SHOW_ITEM_DETAIL,
    SUBMIT_FILTER_PRICE,
    SUBMIT_FILTER_RANK,
    SUBMIT_FILTER_TIME_AVAILABLE, SWITCH_LAYOUT_PRODUCTS,
    TOGGLE_EDITOR_FILTER_PRICE,
    TOGGLE_EDITOR_FILTER_RANK,
    TOGGLE_EDITOR_FILTER_TIME_AVAILABLE,
    TOGGLE_LIKE_ITEM_FAILURE,
    TOGGLE_LIKE_ITEM_REQUEST,
    TOGGLE_LIKE_ITEM_SUCCESS,
    TOGGLE_UPGRADE_POPUP,
    SET_TRIAL_QUERY_RANK,
} from "./actionTypes";
import {changeQuerySearch, parseSearchQuery} from "../../helpers/RouterHelper";
import {getMetaListItems, getPaginationControlData} from "./selectors";
import moment from "moment";
import {logEvent} from "../../helpers/AnalyticsHelpers";
import {showNotify} from "../notify-modal/actions";
import isEmpty from "lodash/isEmpty";
import {
    _getProductDetail,
    _getTotalProducts,
    _searchProducts,
    _toggleLikeProduct
} from "../../services/ProductServices";
import parsePastTime from "../../helpers/time/parsePastTime";
import isBetaVersion from "../../helpers/common/isBetaVersion";
import {makeRequest} from "../../services/ws/WSSerivces";
import {detectASIN} from "../../helpers/AmazonHelpers";

export const toggleUpgradePopup = () => dispatch => {
    dispatch({
        type: TOGGLE_UPGRADE_POPUP
    });
};

export const receiveProducts = (result) => (dispatch) => {
    const {error} = result;

    if (error) {
        dispatch({
            type: FETCH_LIST_ITEMS_FAILURE,
            error,
            enableLoadingBar: true
        });
    } else {
        dispatch({
            type: FETCH_LIST_ITEMS_SUCCESS,
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
    const price = metaData.get('price');
    const sortBy = metaData.get('sortBy').toJS();
    const currentRank = rank.get('current').toJS();
    const currentPrice = price.get('current').toJS();
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
            price: currentPrice,
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
        type: FETCH_LIST_ITEMS_REQUEST,
        enableLoadingBar: true
    });

    const start = Date.now();

    if (isBetaVersion()) {
        return makeRequest('/sp_', args)
            .then(result => {
                dispatch({
                    type: FETCH_LIST_ITEMS_SUCCESS,
                    result,
                    enableLoadingBar: true
                });

                console.log('REALTIME', Date.now() - start);

                return Promise.resolve(true);
            })
            .catch(error => {
                dispatch({
                    type: FETCH_LIST_ITEMS_FAILURE,
                    error,
                    enableLoadingBar: true
                });

                return Promise.resolve(true);
            });
    }

    return _searchProducts(args)
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

                dispatch({
                    type: CHANGE_TEMP_FILTER_RANK,
                    data: {from: 1, to: ''}
                });

                dispatch({
                    type: CHANGE_SELECT_MARKET_ITEM,
                    market: 'us'
                })
                
                dispatch({
                    type: SUBMIT_FILTER_RANK
                });
            }

            dispatch({
                type: FETCH_LIST_ITEMS_SUCCESS,
                result,
                enableLoadingBar: true
            });

            return Promise.resolve(result);
        })
        .catch(error => {
            dispatch({
                type: FETCH_LIST_ITEMS_FAILURE,
                error,
                enableLoadingBar: true
            });

            return Promise.resolve();
        });
};

export const fetchItemDetail = (productId) => {
    return {
        types: [FETCH_ITEM_DETAIL_REQUEST, FETCH_ITEM_DETAIL_SUCCESS, FETCH_ITEM_DETAIL_FAILURE],
        promise: _getProductDetail(productId),
        productId,
    };
};

export const fetchTotalItems = (s = '') => {
    return {
        promise: _getTotalProducts(s),
        types: [FETCH_TOTAL_ITEMS_REQUEST, FETCH_TOTAL_ITEMS_SUCCESS, FETCH_TOTAL_ITEMS_FAILURE]
    }
};

export const changePaginationNumber = (page, history = null) => dispatch => {
    const pageValidated = page > 0 ? page : 1;

    if (history) {
        changeQuerySearch(history)({page: pageValidated});
    }

    dispatch({
        type: CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
        page: pageValidated
    });

    return Promise.resolve(pageValidated);
};

export const changePaginationPerPage = (number) => dispatch => {
    dispatch({
        type: CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
        page: 1
    });

    dispatch({
        type: CHANGE_PAGINATION_ITEMS_PER_PAGE,
        number
    });

    return Promise.resolve(number);
};

export const initCheckQuerySearch = (history) => dispatch => {
    dispatch({
        type: INIT_SETUP_META
    });

    const query = parseSearchQuery(history);
    if (isEmpty(query)) {
        return Promise.resolve(query);
    }

    const {page, from, to, fromA, toA, sortByField, type, status, fromP, toP, brandType, market} = query;

    const fromAvailable = moment(fromA, 'DD-MM-YYYY').isValid() || parsePastTime(fromA) ? fromA : null;
    const toAvailable = moment(toA, 'DD-MM-YYYY').isValid() || parsePastTime(toA) ? toA : null;

    const fromPrice = fromP ? parseInt(fromP, 10) : 0;
    const toPrice = toP ? parseInt(toP, 10) : 0;

    if (page && !isNaN(page)) {
        dispatch({
            type: CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
            page: parseInt(page, 10)
        });
    }

    if (status) {
        dispatch({
            type: CHANGE_SELECT_STATUS_ITEMS,
            status
        });
    }

    if (type) {
        dispatch({
            type: CHANGE_SELECT_TYPE_ITEM,
            typeItem: type
        });
    }

    if (market) {
        dispatch({
            type: CHANGE_SELECT_MARKET_ITEM,
            market
        })
    }

    if (brandType) {
        dispatch({
            type: CHANGE_SELECT_BRAND_TYPE_ITEM,
            brandType,
        });
    }

    if (sortByField) {
        dispatch({
            type: CHANGE_FIELD_NAME_SORT_BY,
            field: sortByField
        });
    }

    dispatch({
        type: CHANGE_TEMP_FILTER_TIME_AVAILABLE,
        data: {
            from: fromAvailable,
            to: toAvailable
        }
    });

    dispatch({
        type: SUBMIT_FILTER_TIME_AVAILABLE
    });

    dispatch({
        type: CHANGE_TEMP_FILTER_RANK,
        data: {from, to}
    });

    dispatch({
        type: SUBMIT_FILTER_RANK
    });

    dispatch({
        type: CHANGE_TEMP_FILTER_PRICE,
        data: {
            from: fromPrice,
            to: toPrice
        }
    });

    dispatch({
        type: SUBMIT_FILTER_PRICE
    });

    const {term, excludedKeyword, searchType} = query;
    dispatch({
        type: CHANGE_SEARCH_ITEMS_QUERY,
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
        type: CHANGE_SEARCH_ITEMS_QUERY,
        query
    });

    return Promise.resolve(query);
};

export const changeSelectStatusItem = (status) => dispatch => {
    dispatch({
        type: CHANGE_SELECT_STATUS_ITEMS,
        status
    });

    return Promise.resolve(status);
};

export const changeSelectMarketItem = (market) => dispatch => {
    dispatch({
        type: CHANGE_SELECT_MARKET_ITEM,
        market
    });

    return Promise.resolve(market);
};

export const showItemDetail = ({id, index}) => dispatch => {
    dispatch({
        type: SHOW_ITEM_DETAIL,
        data: {id, index}
    });

    return dispatch(fetchItemDetail(id));
};

export const closeModalItemDetail = () => dispatch => {
    dispatch({
        type: CLOSE_MODAL_ITEM_DETAIL
    });

    return Promise.resolve();
};

export const toggleLikeItem = (productId) => {
    return {
        types: [TOGGLE_LIKE_ITEM_REQUEST, TOGGLE_LIKE_ITEM_SUCCESS, TOGGLE_LIKE_ITEM_FAILURE],
        promise: _toggleLikeProduct(productId),
        enableLoadingBar: true
    };
};

export const submitFilterRank = () => dispatch => {
    dispatch({
        type: SUBMIT_FILTER_RANK
    });

    return Promise.resolve();
};

export const changeTempFilterRank = (data) => dispatch => {
    const {from, to} = data.toJS();

    dispatch({
        type: CHANGE_TEMP_FILTER_RANK,
        data: {from, to}
    });

    return Promise.resolve();
};

export const openEditFilterRank = () => dispatch => {
    dispatch({
        type: OPEN_EDITOR_FILTER_RANK
    });

    return Promise.resolve();
};

export const toggleEditFilterRank = () => dispatch => {
    dispatch({
        type: TOGGLE_EDITOR_FILTER_RANK
    });

    return Promise.resolve();
};

/**
 * Filter time available
 */
export const openEditFilterTimeAvailable = () => dispatch => {
    dispatch({
        type: OPEN_EDITOR_FILTER_TIME_AVAILABLE
    });

    return Promise.resolve();
};

export const toggleEditFilterTimeAvailable = () => dispatch => {
    dispatch({
        type: TOGGLE_EDITOR_FILTER_TIME_AVAILABLE
    });

    return Promise.resolve();
};

export const submitFilterTimeAvailable = (data) => dispatch => {
    dispatch({
        type: SUBMIT_FILTER_TIME_AVAILABLE,
        data
    });

    return Promise.resolve();
};

export const changeTempFilterTimeAvailable = (data) => dispatch => {
    dispatch({
        type: CHANGE_TEMP_FILTER_TIME_AVAILABLE,
        data
    });

    return Promise.resolve();
};

export const changeFieldNameSortBy = (field) => dispatch => {
    dispatch({
        type: CHANGE_FIELD_NAME_SORT_BY,
        field
    });

    return Promise.resolve(field);
};

export const changeSelectTypeItem = (type) => dispatch => {
    dispatch({
        type: CHANGE_SELECT_TYPE_ITEM,
        typeItem: type
    });

    return Promise.resolve(type);
};

export const changeSelectBrandTypeItem = (type) => dispatch => {
    dispatch({
        type: CHANGE_SELECT_BRAND_TYPE_ITEM,
        brandType: type
    });

    return Promise.resolve(type);
};

/**
 * Filter price
 */
export const openEditFilterPrice = () => dispatch => {
    dispatch({
        type: OPEN_EDITOR_FILTER_PRICE
    });

    return Promise.resolve();
};

export const toggleEditFilterPrice = () => dispatch => {
    dispatch({
        type: TOGGLE_EDITOR_FILTER_PRICE
    });

    return Promise.resolve();
};

export const submitFilterPrice = () => dispatch => {
    dispatch({
        type: SUBMIT_FILTER_PRICE
    });

    return Promise.resolve();
};

export const changeTempFilterPrice = (data) => dispatch => {
    const {from, to} = data.toJS();

    dispatch({
        type: CHANGE_TEMP_FILTER_PRICE,
        data: {from, to}
    });

    return Promise.resolve();
};

export const switchLayout = (layout) => dispatch => {
    dispatch({
        type: SWITCH_LAYOUT_PRODUCTS,
        layout
    });

    return Promise.resolve(layout);
};

export const setTrialQueryRank = () => dispatch => {
    dispatch({
        type: SET_TRIAL_QUERY_RANK
    });

    return Promise.resolve();
};