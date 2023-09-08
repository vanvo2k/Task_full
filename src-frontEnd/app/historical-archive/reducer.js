import {createReducer} from "redux-create-reducer";
import {combineReducers} from "redux-immutable";
import {fromJS, List, Map} from "immutable";
import {
    HISTORY_CHANGE_FIELD_NAME_SORT_BY,
    HISTORY_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
    HISTORY_CHANGE_PAGINATION_ITEMS_PER_PAGE,
    HISTORY_CHANGE_SEARCH_ITEMS_QUERY,
    HISTORY_CHANGE_SELECT_BRAND_TYPE_ITEM,
    HISTORY_CHANGE_SELECT_TYPE_ITEM,
    HISTORY_CHANGE_TEMP_FILTER_PRICE,
    HISTORY_CHANGE_TEMP_FILTER_RANK,
    HISTORY_CHANGE_TEMP_FILTER_HISTORICAL_DAY,
    HISTORY_CHANGE_TEMP_FILTER_TIME_AVAILABLE,
    HISTORY_CLOSE_EDITOR_FILTER_PRICE,
    HISTORY_CLOSE_EDITOR_FILTER_RANK,
    HISTORY_CLOSE_EDITOR_FILTER_HISTORICAL_DAY,
    HISTORY_CLOSE_EDITOR_FILTER_TIME_AVAILABLE,
    HISTORY_CLOSE_MODAL_ITEM_DETAIL, HISTORY_FETCH_ITEM_DETAIL_FAILURE, HISTORY_FETCH_ITEM_DETAIL_REQUEST,
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
    HISTORY_SUBMIT_FILTER_HISTORICAL_DAY,
    HISTORY_SUBMIT_FILTER_TIME_AVAILABLE,
    HISTORY_SWITCH_LAYOUT_PRODUCTS,
    HISTORY_TOGGLE_EDITOR_FILTER_PRICE,
    HISTORY_TOGGLE_EDITOR_FILTER_RANK,
    HISTORY_TOGGLE_LIKE_ITEM_SUCCESS,
    HISTORY_TOGGLE_EDITOR_FILTER_HISTORICAL_DAY,
    HISTORY_TOGGLE_EDITOR_FILTER_TIME_AVAILABLE
} from "./actionTypes";
import {AUTH_LOGIN_SUCCESS} from "../../constants/ActionTypes";

const initItemsState = {
    byIds: {},
    allIds: [],
    loading: false,
    error: ''
};

const items = createReducer(fromJS(initItemsState), {
    [HISTORY_FETCH_LIST_ITEMS_REQUEST](state) {
        return state
            .set('loading', true)
            .set('error', '');
    },
    [HISTORY_FETCH_LIST_ITEMS_FAILURE](state, action) {
        const {error} = action;
        const message = error.message || error;

        return state
            .set('loading', false)
            .set('error', message)
            .set('allIds', fromJS([]))
            .set('byIds', fromJS({}));
    },
    [HISTORY_FETCH_LIST_ITEMS_SUCCESS](state, action) {
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
    [HISTORY_FETCH_ITEM_DETAIL_REQUEST](state, action) {
        const {productId} = action;

        return state.setIn(['byIds', productId, 'loading'], true);
    },
    [HISTORY_FETCH_ITEM_DETAIL_SUCCESS](state, action) {
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
    [HISTORY_FETCH_ITEM_DETAIL_FAILURE](state, action) {
        const {productId} = action;

        return state.setIn(['byIds', productId, 'loading'], false);
    },
    [HISTORY_TOGGLE_LIKE_ITEM_SUCCESS](state, action) {
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
        [HISTORY_INIT_SETUP_META](state, action) {
            return state.set('page', 1);
        },
        [HISTORY_FETCH_LIST_ITEMS_SUCCESS](state, action) {
            const {result} = action;
            const {data, success} = result;
            if (!success) {
                return state;
            }

            return state
                .set('totalPage', data.pages)
                .set('total', data.total);
        },
        [HISTORY_CHANGE_PAGINATION_ITEMS_CURRENT_PAGE](state, action) {
            const {page} = action;

            return state.set('page', page);
        },

        [HISTORY_CHANGE_PAGINATION_ITEMS_PER_PAGE](state, action) {
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
    index: 0
}), {
    [HISTORY_SHOW_ITEM_DETAIL](state, action) {
        const {data} = action;
        const {id, index} = data;

        return state
            .set('isOpen', true)
            .set('id', id)
            .set('index', index)
    },
    [HISTORY_CLOSE_MODAL_ITEM_DETAIL](state, action) {
        return state.set('isOpen', false);
    },
});

const initMetaState = {
    total: 0,
    query: {
        term: '',
        excludedKeyword: '',
        searchType: 'all_words'
    },
    filter: {},
    rank: {
        current: {
            from: 1,
            to: 2000000
        },
        temp: {
            from: 1,
            to: ''
        },
        isOpen: false
    },
    price: {
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
    sortBy: {
        field: 'trending',
    },
    historical: {
        isOpen: false,
        current: {
            date: null
        },
        temp: {
            date: null
        }
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
    type: 'all',
    brandType: 'all',
    layout: 'grid'
};

const meta = createReducer(fromJS(initMetaState), {
    [HISTORY_INIT_SETUP_META](state) {
        const init = fromJS(initMetaState);

        return state.merge(init.remove('layout'));
    },
    [HISTORY_SWITCH_LAYOUT_PRODUCTS](state, action) {
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
    [HISTORY_CHANGE_SEARCH_ITEMS_QUERY](state, action) {
        const {query} = action;
        const query_ = state.get('query');
        const newQuery = Map(query);

        return state.set('query', query_.merge(newQuery));
    },
    [HISTORY_TOGGLE_EDITOR_FILTER_RANK](state, action) {
        return state
            .setIn(['rank', 'isOpen'], !state.getIn(['rank', 'isOpen']));
    },
    [HISTORY_OPEN_EDITOR_FILTER_RANK](state, action) {
        return state
            .setIn(['rank', 'isOpen'], true)
            .setIn(['rank', 'temp'], state.getIn(['rank', 'current']));
    },
    [HISTORY_CLOSE_EDITOR_FILTER_RANK](state, action) {
        return state.setIn(['rank', 'isOpen'], false);
    },
    [HISTORY_CHANGE_TEMP_FILTER_RANK](state, action) {
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
    [HISTORY_SUBMIT_FILTER_RANK](state, action) {
        return state
            .setIn(['rank', 'current'], state.getIn(['rank', 'temp']))
            .setIn(['rank', 'isOpen'], false)
    },
    [HISTORY_CHANGE_FIELD_NAME_SORT_BY](state, action) {
        const {field} = action;

        return state.setIn(['sortBy', 'field'], field);
    },
    [HISTORY_CHANGE_SELECT_TYPE_ITEM](state, action) {
        const {typeItem} = action;

        return state.set('type', typeItem);
    },
    [HISTORY_CHANGE_SELECT_BRAND_TYPE_ITEM](state, action) {
        const {brandType} = action;

        return state.set('brandType', brandType);
    },
    [HISTORY_TOGGLE_EDITOR_FILTER_PRICE](state, action) {
        return state
            .setIn(['price', 'isOpen'], !state.getIn(['price', 'isOpen']));
    },
    [HISTORY_OPEN_EDITOR_FILTER_PRICE](state, action) {
        return state
            .setIn(['price', 'isOpen'], true)
            .setIn(['price', 'temp'], state.getIn(['price', 'current']));
    },
    [HISTORY_CLOSE_EDITOR_FILTER_PRICE](state, action) {
        return state.setIn(['price', 'isOpen'], false);
    },
    [HISTORY_CHANGE_TEMP_FILTER_PRICE](state, action) {
        const {data} = action;
        const {from, to} = data;
        const fromNumber = parseInt(from, 10);
        const toNumber = parseInt(to, 10);

        const fromValidated = (!fromNumber || fromNumber < 0 || Number.isNaN(fromNumber)) ? 0 : fromNumber;
        const toValidated = (!toNumber || Number.isNaN(toNumber)) ? 0 : toNumber;

        return state.setIn(['price', 'temp'], fromJS({
            from: fromValidated ? fromValidated : 0,
            to: toValidated ? toValidated : 0
        }));
    },
    [HISTORY_SUBMIT_FILTER_PRICE](state, action) {
        return state
            .setIn(['price', 'current'], state.getIn(['price', 'temp']))
            .setIn(['price', 'isOpen'], false)
    },
    [HISTORY_OPEN_EDITOR_FILTER_HISTORICAL_DAY](state, action) {
        return state
            .setIn(['historical', 'isOpen'], true)
            .setIn(['historical', 'temp'], state.getIn(['historical', 'current']))
    },
    [HISTORY_CLOSE_EDITOR_FILTER_HISTORICAL_DAY](state, action) {
        return state
            .setIn(['historical', 'isOpen'], false)
    },
    [HISTORY_TOGGLE_EDITOR_FILTER_HISTORICAL_DAY](state, action) {
        return state
            .setIn(['historical', 'isOpen'], !state.getIn(['historical', 'isOpen']));
    },
    [HISTORY_SUBMIT_FILTER_HISTORICAL_DAY](state, action) {
        return state
            .setIn(['historical', 'current'], state.getIn(['historical', 'temp']))
            .setIn(['historical', 'isOpen'], false)
    },
    [HISTORY_CHANGE_TEMP_FILTER_HISTORICAL_DAY](state, action) {
        const {data} = action;
        const date = data ? data.date : null

        return state
            .setIn(['historical', 'temp'], fromJS({date}));
    },
    [HISTORY_OPEN_EDITOR_FILTER_TIME_AVAILABLE](state, action) {
        return state
            .setIn(['available', 'isOpen'], true)
            .setIn(['available', 'temp'], state.getIn(['available', 'current']))
    },
    [HISTORY_CLOSE_EDITOR_FILTER_TIME_AVAILABLE](state, action) {
        return state
            .setIn(['available', 'isOpen'], false)
    },
    [HISTORY_TOGGLE_EDITOR_FILTER_TIME_AVAILABLE](state, action) {
        return state
            .setIn(['available', 'isOpen'], !state.getIn(['available', 'isOpen']));
    },
    [HISTORY_SUBMIT_FILTER_TIME_AVAILABLE](state, action) {
        return state
            .setIn(['available', 'current'], state.getIn(['available', 'temp']))
            .setIn(['available', 'isOpen'], false)
    },
    [HISTORY_CHANGE_TEMP_FILTER_TIME_AVAILABLE](state, action) {
        const {data} = action;
        const {from, to} = data;

        return state
            .setIn(['available', 'temp'], fromJS({from, to}));
    },
});

export default combineReducers({
    items,
    pagination,
    showItem,
    meta
});