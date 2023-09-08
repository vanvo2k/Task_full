import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {
    FETCH_STATISTIC_HAS_RANK_SUCCESS,
    FETCH_STATISTIC_OVERVIEW_FAILURE,
    FETCH_STATISTIC_OVERVIEW_REQUEST, FETCH_STATISTIC_OVERVIEW_SUCCESS,
    STATISTIC_CHANGE_SELECT_DAYS
} from "./actionTypes";

const initState = {
    availableStatistic: {},
    hasRankStatistic: {},
    showDays: 30,
    loading: false
};

export default createReducer(fromJS(initState), {
    [FETCH_STATISTIC_OVERVIEW_REQUEST](state) {
        return state.set('loading', true);
    },
    [FETCH_STATISTIC_OVERVIEW_FAILURE](state) {
        return state.set('loading', false);
    },
    [FETCH_STATISTIC_OVERVIEW_SUCCESS](state, action) {
        const {result} = action;
        const {success, data} = result;

        if (!success) {
            return state;
        }

        return state
            .set('availableStatistic', fromJS(data))
            .set('loading', false);
    },
    [FETCH_STATISTIC_HAS_RANK_SUCCESS](state, action) {
        const {result} = action;
        const {success, data} = result;

        if (!success) {
            return state;
        }

        return state
            .set('hasRankStatistic', fromJS(data))
            .set('loading', false);
    },
    [STATISTIC_CHANGE_SELECT_DAYS](state, action) {
        const {days} = action;

        return state.set('showDays', parseInt(days, 10));
    }
});