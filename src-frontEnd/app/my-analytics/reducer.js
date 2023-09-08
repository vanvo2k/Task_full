import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {
    FETCH_LIST_MY_ANALYTICS_FAILURE, FETCH_LIST_MY_ANALYTICS_REQUEST,
    FETCH_LIST_MY_ANALYTICS_SUCCESS, FETCH_REMOVE_MY_ANALYTIC_FAILURE, FETCH_REMOVE_MY_ANALYTIC_REQUEST,
    FETCH_REMOVE_MY_ANALYTIC_SUCCESS
} from "./actionTypes";

const initState = {
    loading: false,
    items: [],
    pagination: {}
};

export default createReducer(fromJS(initState), {
    [FETCH_LIST_MY_ANALYTICS_REQUEST](state, action) {
        return state.set('loading', true);
    },
    [FETCH_LIST_MY_ANALYTICS_SUCCESS](state, action) {
        const {result} = action;
        const {myAnalytics} = result.data;
        const items = myAnalytics.docs;

        return state
            .set('items', fromJS(items))
            .set('loading', false);
    },
    [FETCH_LIST_MY_ANALYTICS_FAILURE](state, action) {
        return state.set('loading', false);
    },
    [FETCH_REMOVE_MY_ANALYTIC_REQUEST](state, action) {
        const items = state.get('items').map(item => {
            if (item.get('_id') === action.id) {
                return item.set('loading', true);
            }

            return item;
        });

        return state.set('items', items);
    },
    [FETCH_REMOVE_MY_ANALYTIC_SUCCESS](state, action) {
        const items = state.get('items').filter(item => {
            return item.get('_id') !== action.id;
        });

        return state.set('items', items);
    },
    [FETCH_REMOVE_MY_ANALYTIC_FAILURE](state, action) {
        const items = state.get('items').map(item => {
            if (item.get('_id') === action.id) {
                return item.set('loading', false);
            }

            return item;
        });

        return state.set('items', items);
    },
});