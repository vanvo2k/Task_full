import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {combineReducers} from "redux-immutable";

import {NAME} from "./constants";

import statisticOverviewReducer from "./overview/reducer";
import {NAME as statisticOverviewNAME} from "./overview/constants";

import statisticUpdateReducer from "./update/reducer";
import {NAME as statisticUpdateNAME} from "./update/constants";
import {
    FETCH_ITEMS_TOP_RISING_SUCCESS, FETCH_ITEMS_TOP_RANK_SUCCESS, FETCH_STATISTIC_ITEM_TYPES_SUCCESS,
    FETCH_STATISTIC_RANK_RANGES_SUCCESS, FETCH_ITEMS_RANDOM_SUCCESS
} from "./actionTypes";

const initState = {
    rankRanges: {
        total: 0,
        ranges: []
    },
    itemTypes: {
        total: 0,
        statistic: []
    },
    itemsTopRising: [],
    itemsTopRanking: [],
    itemsRandom: [],
};

const root = createReducer(fromJS(initState), {
    [FETCH_ITEMS_RANDOM_SUCCESS](state, action) {
        const {result} = action;
        const {data, success} = result;

        if (!success) {
            return state;
        }

        return state.set('itemsRandom', fromJS(data));
    },
    [FETCH_ITEMS_TOP_RANK_SUCCESS](state, action) {
        const {result} = action;
        const {success, data} = result;

        if (!success) {
            return state;
        }

        return state.set('itemsTopRanking', fromJS(data));
    },
    [FETCH_ITEMS_TOP_RISING_SUCCESS](state, action) {
        const {result} = action;
        const {data} = result;

        return state.set('itemsTopRising', fromJS(data));
    },
    [FETCH_STATISTIC_RANK_RANGES_SUCCESS](state, action) {
        const {result} = action;
        const {data} = result;

        return state.set('rankRanges', fromJS(data));
    },
    [FETCH_STATISTIC_ITEM_TYPES_SUCCESS](state, action) {
        const {result} = action;
        const {data} = result;

        return state.set('itemTypes', fromJS(data));
    }
});

export default combineReducers({
    [NAME]: root,
    [statisticOverviewNAME]: statisticOverviewReducer,
    [statisticUpdateNAME]: statisticUpdateReducer,
});