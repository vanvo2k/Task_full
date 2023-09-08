import {createReducer} from "redux-create-reducer";
import {combineReducers} from "redux-immutable";
import {fromJS, List, Map} from "immutable";

import {
    CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
    CHANGE_PAGINATION_ITEMS_PER_PAGE,
    CLOSE_MODAL_ITEM_DETAIL,
    FETCH_ITEM_DETAIL_FAILURE,
    FETCH_ITEM_DETAIL_REQUEST,
    FETCH_ITEM_DETAIL_SUCCESS,
    FETCH_LIST_FAVORITE_ITEMS_SUCCESS,
    SHOW_ITEM_DETAIL
} from "./actionTypes";
import {AUTH_LOGIN_SUCCESS} from "../../constants/ActionTypes";
import PaginationItems from "./components/footer/PaginationItems";

const initItemsState = {
    byIds: {},
    allIds: []
};

const items = createReducer(fromJS(initItemsState), {
    [FETCH_LIST_FAVORITE_ITEMS_SUCCESS](state, action) {
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
    }
});

const pagination = createReducer(
    Map({
        page: PaginationItems.getInitQuery(),
        totalPage: 0,
        perPage: 36,
    }),
    {
        [FETCH_LIST_FAVORITE_ITEMS_SUCCESS](state, action) {
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

export default combineReducers({
    items,
    pagination,
    showItem
});