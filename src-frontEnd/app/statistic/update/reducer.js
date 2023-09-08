import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {
    FETCH_STATISTIC_UPDATE_FAILURE,
    FETCH_STATISTIC_UPDATE_REQUEST, FETCH_STATISTIC_UPDATE_SUCCESS,
} from "./actionTypes";

const initState = {
    updateStatistic: {},
    loading: false
};

export default createReducer(fromJS(initState), {
    [FETCH_STATISTIC_UPDATE_REQUEST](state) {
        return state.set('loading', true);
    },
    [FETCH_STATISTIC_UPDATE_FAILURE](state) {
        return state.set('loading', false);
    },
    [FETCH_STATISTIC_UPDATE_SUCCESS](state, action) {
        const {result} = action;
        const {success, data} = result;

        if (!success) {
            return state;
        }

        return state
            .set('updateStatistic', fromJS(data))
            .set('loading', false);
    }
});