import {createReducer} from "redux-create-reducer";
import {combineReducers} from "redux-immutable";
import {Map, List, fromJS} from "immutable";

import {
    SUBMIT_FILTER_RANK,
    CHANGE_PAGINATION_ITEMS_CURRENT_PAGE, CHANGE_PAGINATION_ITEMS_PER_PAGE, CHANGE_SEARCH_ITEMS_QUERY,
    CLOSE_MODAL_ITEM_DETAIL, FETCH_ITEM_DETAIL_SUCCESS,
    FETCH_TOTAL_FAVORITE_ITEMS_SUCCESS, SHOW_ITEM_DETAIL, TOGGLE_LIKE_ITEM_SUCCESS,
    TOGGLE_SELECT_ALIVE_ITEMS,
    CHANGE_TEMP_FILTER_RANK, OPEN_EDITOR_FILTER_RANK, CLOSE_EDITOR_FILTER_RANK,
    TOGGLE_EDITOR_FILTER_RANK, FETCH_LIST_TREND_ITEMS_SUCCESS, FETCH_ITEM_DETAIL_REQUEST, FETCH_ITEM_DETAIL_FAILURE
} from "./actionTypes";
import PaginationItems from "./components/footer/PaginationItems";

const initItemsState = {
    byIds: {},
    allIds: []
};

const items = createReducer(fromJS(initItemsState), {
    [FETCH_LIST_TREND_ITEMS_SUCCESS](state, action) {
        const {result} = action;
        const {success, data} = result;
        if (!success) {
            return state;
        }

        const items = data.docs || [];

        let byIds = Map();
        let allIds = List();
        items.forEach((item) => {
            byIds = byIds.set(item._id, fromJS(item));
            allIds = allIds.push(item._id);
        });

        return state
            .set('byIds', byIds)
            .set('allIds', allIds);
    },
    [FETCH_ITEM_DETAIL_REQUEST](state, action) {
        const {productId} = action;

        return state.setIn(['byIds', productId, 'loading'], true);
    },
    [FETCH_ITEM_DETAIL_SUCCESS](state, action) {
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
    [FETCH_ITEM_DETAIL_FAILURE](state, action) {
        const {productId} = action;

        return state.setIn(['byIds', productId, 'loading'], false);
    },
    [TOGGLE_LIKE_ITEM_SUCCESS](state, action) {
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
        page: PaginationItems.getInitQuery(),
        totalPage: 0,
        perPage: 100,
        total: 0,
        query: {}
    }),
    {
        [FETCH_LIST_TREND_ITEMS_SUCCESS](state, action) {
            const {result} = action;
            const {success, data} = result;

            if (!success) {
                return state;
            }

            return state
                .set('totalPage', data.pages)
                .set('total', data.total);
        },
        [CHANGE_PAGINATION_ITEMS_CURRENT_PAGE](state, action) {
            const {page} = action;

            return state.set('page', page);
        },

        [CHANGE_PAGINATION_ITEMS_PER_PAGE](state, action) {
            const {number} = action;

            return state.set('perPage', number);
        }
    }
);

const showItem = createReducer(fromJS({
    isOpen: false,
    id: '',
    index: 0,
}), {
    [SHOW_ITEM_DETAIL](state, action) {
        const {data} = action;
        const {id, index} = data;

        return state
            .set('isOpen', true)
            .set('id', id)
            .set('index', index);
    },
    [CLOSE_MODAL_ITEM_DETAIL](state, action) {
        return state.set('isOpen', false);
    }
});

const meta = createReducer(fromJS({
    total: 0,
    query: {},
    selectAlive: true,
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
    }
}), {
    [FETCH_TOTAL_FAVORITE_ITEMS_SUCCESS](state, action) {
        const {result} = action;
        const {total} = result;

        return state.set('total', total);
    },
    [TOGGLE_LIKE_ITEM_SUCCESS](state, action) {
        return state.set('total', state.get('total') - 1);
    },
    [CHANGE_SEARCH_ITEMS_QUERY](state, action) {
        const {query} = action;
        const query_ = state.get('query');
        const newQuery = Map(query);

        return state.set('query', query_.merge(newQuery));
    },
    [TOGGLE_SELECT_ALIVE_ITEMS](state, action) {
        const {alive} = action;

        return state.set('selectAlive', alive);
    },
    [TOGGLE_EDITOR_FILTER_RANK](state, action) {
        return state
            .setIn(['rank', 'isOpen'], !state.getIn(['rank', 'isOpen']));
    },
    [OPEN_EDITOR_FILTER_RANK](state, action) {
        return state
            .setIn(['rank', 'isOpen'], true)
            .setIn(['rank', 'temp'], state.getIn(['rank', 'current']));
    },
    [CLOSE_EDITOR_FILTER_RANK](state, action) {
        return state.setIn(['rank', 'isOpen'], false);
    },
    [CHANGE_TEMP_FILTER_RANK](state, action) {
        const {data} = action;
        const {from, to} = data;
        const fromNumber = parseInt(from, 10);
        const toNumber = parseInt(to, 10);

        const _from = (!fromNumber || fromNumber < 1 || Number.isNaN(fromNumber)) ? 1 : fromNumber;
        const _to = (!toNumber || Number.isNaN(toNumber)) ? '' : toNumber;
        const __to = (_to < _from && _to) ? _from : _to;

        return state.setIn(['rank', 'temp'], fromJS({
            from: _from ? _from : 1,
            to: __to ? __to : ''
        }));
    },
    [SUBMIT_FILTER_RANK](state, action) {
        return state.setIn(['rank', 'current'], state.getIn(['rank', 'temp']));
    },
});


export default combineReducers({
    items,
    pagination,
    showItem,
    meta
});