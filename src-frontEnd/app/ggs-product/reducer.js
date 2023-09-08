import {createReducer} from "redux-create-reducer";
import {combineReducers} from "redux-immutable";
import {fromJS, List, Map} from "immutable";

import {
    GGS_CHANGE_FIELD_NAME_SORT_BY,
    GGS_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
    GGS_CHANGE_PAGINATION_ITEMS_PER_PAGE,
    GGS_CHANGE_QUERY,
    GGS_CHANGE_SEARCH_ITEMS_QUERY,
    GGS_CHANGE_SELECT_BRAND_TYPE_ITEM,
    GGS_CHANGE_SELECT_MARKET_ITEM,
    GGS_CHANGE_SELECT_STATUS_ITEMS,
    GGS_CHANGE_SELECT_TYPE_ITEM, GGS_CHANGE_TEMP_FILTER_MAX_PRICE,
    GGS_CHANGE_TEMP_FILTER_MIN_PRICE,
    GGS_CHANGE_TEMP_FILTER_PRICE,
    GGS_CHANGE_TEMP_FILTER_RANK,
    GGS_CHANGE_TEMP_FILTER_TIME_AVAILABLE, GGS_CLOSE_EDITOR_FILTER_MAX_PRICE,
    GGS_CLOSE_EDITOR_FILTER_MIN_PRICE,
    GGS_CLOSE_EDITOR_FILTER_PRICE,
    GGS_CLOSE_EDITOR_FILTER_RANK,
    GGS_CLOSE_EDITOR_FILTER_TIME_AVAILABLE,
    GGS_CLOSE_MODAL_ITEM_DETAIL,
    GGS_FETCH_ITEM_DETAIL_FAILURE,
    GGS_FETCH_ITEM_DETAIL_REQUEST,
    GGS_FETCH_ITEM_DETAIL_SUCCESS,
    GGS_FETCH_LIST_ITEMS_FAILURE,
    GGS_FETCH_LIST_ITEMS_REQUEST,
    GGS_FETCH_LIST_ITEMS_SUCCESS,
    GGS_FETCH_TOTAL_ITEMS_SUCCESS,
    GGS_INIT_SETUP_META, GGS_OPEN_EDITOR_FILTER_MAX_PRICE,
    GGS_OPEN_EDITOR_FILTER_MIN_PRICE,
    GGS_OPEN_EDITOR_FILTER_PRICE,
    GGS_OPEN_EDITOR_FILTER_RANK,
    GGS_OPEN_EDITOR_FILTER_TIME_AVAILABLE,
    GGS_SAVE_QUERY_SEARCH_ITEM_FAILURE,
    GGS_SAVE_QUERY_SEARCH_ITEM_REQUEST,
    GGS_SAVE_QUERY_SEARCH_ITEM_SUCCESS,
    GGS_SET_CURRENT_MY_ANALYTIC_ID,
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
    GGS_TOGGLE_LIKE_ITEM_SUCCESS
} from "./actionTypes";
import {AUTH_LOGIN_SUCCESS} from "../../constants/ActionTypes";
import {FETCH_REMOVE_MY_ANALYTIC_SUCCESS} from "../my-analytics/actionTypes";

const initItemsState = {
    byIds: {},
    allIds: [],
    loading: false,
    error: ''
};

const items = createReducer(fromJS(initItemsState), {
    [GGS_FETCH_LIST_ITEMS_REQUEST](state) {
        return state
            .set('loading', true)
            .set('error', '');
    },
    [GGS_FETCH_LIST_ITEMS_FAILURE](state, action) {
        const {error} = action;
        const message = error.message || error;

        return state
            .set('loading', false)
            .set('error', message)
            .set('allIds', fromJS([]))
            .set('byIds', fromJS({}));
    },
    [GGS_FETCH_LIST_ITEMS_SUCCESS](state, action) {
        const {result, merge} = action;

        const {data, success} = result;
        if (!success) {
            return state.set('loading', false);
        }

        const items = data.docs || [];

        let byIds = Map();
        let allIds = List();
        items.forEach((item) => {
            byIds = byIds.set(item._id, fromJS(item));
            allIds = allIds.push(item._id);
        });

        return state
            .set('loading', false)
            .set('byIds', !!merge ? state.get('byIds').merge(byIds) : byIds)
            .set('allIds', !!merge ? state.get('allIds').concat(allIds) : allIds)
            .set('error', '');
    },
    [GGS_FETCH_ITEM_DETAIL_REQUEST](state, action) {
        const {productId} = action;

        return state.setIn(['byIds', productId, 'loading'], true);
    },
    [GGS_FETCH_ITEM_DETAIL_SUCCESS](state, action) {
        const {result} = action;
        const {data, success} = result;

        if (!success) {
            return state;
        }

        const {_id} = data;

        return state.setIn(['byIds', _id], fromJS({
            ...data,
            loading: false
        }));
    },
    [GGS_FETCH_ITEM_DETAIL_FAILURE](state, action) {
        const {productId} = action;

        return state.setIn(['byIds', productId, 'loading'], false);
    },
    [GGS_TOGGLE_LIKE_ITEM_SUCCESS](state, action) {
        const {result} = action;
        const {success, data} = result;

        if (!success) {
            return state;
        }

        const {id, liked} = data;

        return state.setIn(['byIds', id, 'liked'], liked);
    }
});

const pagination = createReducer(
    Map({
        page: 1,
        totalPage: 0,
        perPage: 36,
        total: 0,
        query: {}
    }),
    {
        [GGS_INIT_SETUP_META](state, action) {
            return state.set('page', 1);
        },
        [GGS_FETCH_LIST_ITEMS_SUCCESS](state, action) {
            const {result} = action;
            const {data, success} = result;

            if (!success) {
                return state;
            }

            return state
                .set('totalPage', data.pages)
                .set('total', data.total);
        },
        [GGS_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE](state, action) {
            const {page} = action;

            return state.set('page', page);
        },

        [GGS_CHANGE_PAGINATION_ITEMS_PER_PAGE](state, action) {
            const {number} = action;

            return state.set('perPage', number);
        },
        [AUTH_LOGIN_SUCCESS](state, action) {
            const {data} = action;
            const {profile} = data;
            const {settings} = profile;

            if (settings) {
                const {showItemsPerPage} = settings;

                if (showItemsPerPage) {
                    return state.set('perPage', 36);
                }
            }

            return state;
        }
    }
);

const showItem = createReducer(fromJS({
    isOpen: false,
    id: '',
    index: 0,
}), {
    [GGS_SHOW_ITEM_DETAIL](state, action) {
        const {data} = action;
        const {id, index} = data;

        return state
            .set('isOpen', true)
            .set('id', id)
            .set('index', index);
    },
    [GGS_CLOSE_MODAL_ITEM_DETAIL](state, action) {
        return state.set('isOpen', false);
    }
});

const initMetaState = {
    total: 0,
    query: {
        term: '',
        excludedKeyword: '',
        searchType: 'all_words'
    },
    filter: {},
    selectStatus: 'alive',
    selectMarket: 'us',
    rank: {
        current: {
            from: 1,
            to: ''
        },
        temp: {
            from: 1,
            to: ''
        },
        isOpen: false
    },
    minPrice: {
        current: {
            from: 0,
            to: 0
        },
        temp: {
            from: 0,
            to: 0
        },
        isOpen: false
    },
    maxPrice: {
        current: {
            from: 0,
            to: 0
        },
        temp: {
            from: 0,
            to: 0
        },
        isOpen: false
    },
    available: {
        isOpen: false,
        current: {
            from: null,
            to: null
        },
        temp: {
            from: null,
            to: null
        }
    },
    sortBy: {
        field: 'trending',
    },
    market: 'us',
    type: 'all',
    brandType: 'all',
    layout: 'grid'
};

const meta = createReducer(fromJS(initMetaState), {
    [GGS_INIT_SETUP_META](state) {
        const init = fromJS(initMetaState);

        return state.merge(init.remove('layout'));
    },
    [GGS_CHANGE_QUERY](state, action) {
        const {data} = action;
        const {search, filter, sort} = data;

        const rank = filter.rank || {};
        const minPrice = filter.minPrice || {};
        const maxPrice = filter.maxPrice || {};
        const timeAvailable = filter.timeAvailable || {};

        return state
            .set('query', fromJS({
                term: search.term || '',
                excludedKeyword: search.excluded || '',
                searchType: search.type || 'all_words'
            }))
            .set('selectStatus', filter.status || 'alive')
            .set('selectMarket', filter.market || 'us')
            .set('type', filter.type || 'all')
            .setIn(['rank', 'current'], fromJS({
                from: rank.from,
                to: rank.to
            }))
            .setIn(['available', 'current'], fromJS({
                from: timeAvailable.from,
                to: timeAvailable.to
            }))
            .setIn(['sortBy', 'field'], sort.field || 'trending')
            .setIn(['minPrice', 'current'], fromJS({
                from: minPrice.from || 0,
                to: minPrice.to || 0
            }))
            .setIn(['maxPrice', 'current'], fromJS({
                from: maxPrice.from || 0,
                to: maxPrice.to || 0
            }))
            .set('brandType', filter.brandType || 'all');
    },
    [GGS_SWITCH_LAYOUT_PRODUCTS](state, action) {
        const {layout} = action;

        return state.set('layout', layout);
    },
    [AUTH_LOGIN_SUCCESS](state, action) {
        const {data} = action;
        const {profile} = data;
        const {settings} = profile;

        if (settings) {
            const {layoutListing} = settings;

            if (layoutListing) {
                return state.set('layout', layoutListing);
            }
        }

        return state;
    },
    [GGS_FETCH_TOTAL_ITEMS_SUCCESS](state, action) {
        const {result} = action;
        const {success, data} = result;

        if (!success) {
            return state;
        }

        return state.set('total', data);
    },
    [GGS_CHANGE_SEARCH_ITEMS_QUERY](state, action) {
        const {query} = action;
        const query_ = state.get('query');
        const newQuery = Map(query);

        return state.set('query', query_.merge(newQuery));
    },
    [GGS_CHANGE_SELECT_STATUS_ITEMS](state, action) {
        const {status} = action;

        return state.set('selectStatus', status);
    },
    [GGS_CHANGE_SELECT_MARKET_ITEM](state, action) {
        const {market} = action;

        return state.set('selectMarket', market);
    },
    [GGS_TOGGLE_EDITOR_FILTER_RANK](state, action) {
        return state
            .setIn(['rank', 'isOpen'], !state.getIn(['rank', 'isOpen']));
    },
    [GGS_OPEN_EDITOR_FILTER_RANK](state, action) {
        return state
            .setIn(['rank', 'isOpen'], true)
            .setIn(['rank', 'temp'], state.getIn(['rank', 'current']));
    },
    [GGS_CLOSE_EDITOR_FILTER_RANK](state, action) {
        return state.setIn(['rank', 'isOpen'], false);
    },
    [GGS_CHANGE_TEMP_FILTER_RANK](state, action) {
        const {data} = action;
        const {from, to} = data;
        const fromNumber = parseInt(from, 10);
        const toNumber = parseInt(to, 10);

        const fromValidated = (!fromNumber || fromNumber < 1 || Number.isNaN(fromNumber)) ? '' : fromNumber;
        const toValidated = (!toNumber || Number.isNaN(toNumber)) ? '' : toNumber;

        return state.setIn(['rank', 'temp'], fromJS({
            from: fromValidated ? fromValidated : '',
            to: toValidated ? toValidated : ''
        }));
    },
    [GGS_SUBMIT_FILTER_RANK](state, action) {
        return state
            .setIn(['rank', 'current'], state.getIn(['rank', 'temp']))
            .setIn(['rank', 'isOpen'], false)
    },
    [GGS_OPEN_EDITOR_FILTER_TIME_AVAILABLE](state, action) {
        return state
            .setIn(['available', 'isOpen'], true)
            .setIn(['available', 'temp'], state.getIn(['available', 'current']))
    },
    [GGS_CLOSE_EDITOR_FILTER_TIME_AVAILABLE](state, action) {
        return state
            .setIn(['available', 'isOpen'], false)
    },
    [GGS_TOGGLE_EDITOR_FILTER_TIME_AVAILABLE](state, action) {
        return state
            .setIn(['available', 'isOpen'], !state.getIn(['available', 'isOpen']));
    },
    [GGS_SUBMIT_FILTER_TIME_AVAILABLE](state, action) {
        return state
            .setIn(['available', 'current'], state.getIn(['available', 'temp']))
            .setIn(['available', 'isOpen'], false)
    },
    [GGS_CHANGE_TEMP_FILTER_TIME_AVAILABLE](state, action) {
        const {data} = action;
        const {from, to} = data;

        return state
            .setIn(['available', 'temp'], fromJS({from, to}));
    },
    [GGS_CHANGE_FIELD_NAME_SORT_BY](state, action) {
        const {field} = action;

        return state.setIn(['sortBy', 'field'], field);
    },
    [GGS_CHANGE_SELECT_TYPE_ITEM](state, action) {
        const {typeItem} = action;

        return state.set('type', typeItem);
    },
    [GGS_CHANGE_SELECT_BRAND_TYPE_ITEM](state, action) {
        const {brandType} = action;

        return state.set('brandType', brandType);
    },
    [GGS_TOGGLE_EDITOR_FILTER_MIN_PRICE](state, action) {
        return state
            .setIn(['minPrice', 'isOpen'], !state.getIn(['minPrice', 'isOpen']));
    },
    [GGS_OPEN_EDITOR_FILTER_MIN_PRICE](state, action) {
        return state
            .setIn(['minPrice', 'isOpen'], true)
            .setIn(['minPrice', 'temp'], state.getIn(['minPrice', 'current']));
    },
    [GGS_CLOSE_EDITOR_FILTER_MIN_PRICE](state, action) {
        return state.setIn(['minPrice', 'isOpen'], false);
    },
    [GGS_CHANGE_TEMP_FILTER_MIN_PRICE](state, action) {
        const {data} = action;
        const {from, to} = data;
        const fromNumber = parseInt(from, 10);
        const toNumber = parseInt(to, 10);

        const fromValidated = (!fromNumber || fromNumber < 0 || Number.isNaN(fromNumber)) ? 0 : fromNumber;
        const toValidated = (!toNumber || Number.isNaN(toNumber)) ? 0 : toNumber;

        return state.setIn(['minPrice', 'temp'], fromJS({
            from: fromValidated ? fromValidated : 0,
            to: toValidated ? toValidated : 0
        }));
    },
    [GGS_SUBMIT_FILTER_MIN_PRICE](state, action) {
        return state
            .setIn(['minPrice', 'current'], state.getIn(['minPrice', 'temp']))
            .setIn(['minPrice', 'isOpen'], false)
    },
    [GGS_TOGGLE_EDITOR_FILTER_MAX_PRICE](state, action) {
        return state
            .setIn(['maxPrice', 'isOpen'], !state.getIn(['maxPrice', 'isOpen']));
    },
    [GGS_OPEN_EDITOR_FILTER_MAX_PRICE](state, action) {
        return state
            .setIn(['maxPrice', 'isOpen'], true)
            .setIn(['maxPrice', 'temp'], state.getIn(['maxPrice', 'current']));
    },
    [GGS_CLOSE_EDITOR_FILTER_MAX_PRICE](state, action) {
        return state.setIn(['maxPrice', 'isOpen'], false);
    },
    [GGS_CHANGE_TEMP_FILTER_MAX_PRICE](state, action) {
        const {data} = action;
        const {from, to} = data;
        const fromNumber = parseInt(from, 10);
        const toNumber = parseInt(to, 10);

        const fromValidated = (!fromNumber || fromNumber < 0 || Number.isNaN(fromNumber)) ? 0 : fromNumber;
        const toValidated = (!toNumber || Number.isNaN(toNumber)) ? 0 : toNumber;

        return state.setIn(['maxPrice', 'temp'], fromJS({
            from: fromValidated ? fromValidated : 0,
            to: toValidated ? toValidated : 0
        }));
    },
    [GGS_SUBMIT_FILTER_MAX_PRICE](state, action) {
        return state
            .setIn(['maxPrice', 'current'], state.getIn(['maxPrice', 'temp']))
            .setIn(['maxPrice', 'isOpen'], false)
    },
});

const initStateAnalytic = {
    analyticId: null,
    saving: false,
};

const analytics = createReducer(fromJS(initStateAnalytic), {
    [GGS_SAVE_QUERY_SEARCH_ITEM_REQUEST](state, action) {
        return state.set('saving', true);
    },
    [GGS_SAVE_QUERY_SEARCH_ITEM_SUCCESS](state, action) {
        const {data} = action.result;
        const {createMyAnalytic} = data;
        const {_id} = createMyAnalytic;

        return state
            .set('saving', false)
            .set('analyticId', _id);
    },
    [GGS_SAVE_QUERY_SEARCH_ITEM_FAILURE](state, action) {
        return state.set('saving', false);
    },
    [GGS_SET_CURRENT_MY_ANALYTIC_ID](state, action) {
        const {analyticId} = action;

        return state.set('analyticId', analyticId);
    },
    [FETCH_REMOVE_MY_ANALYTIC_SUCCESS](state, action) {
        return state.set('analyticId', null);
    }
});

export default combineReducers({
    items,
    pagination,
    showItem,
    meta,
    analytics
});