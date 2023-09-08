import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {
    CANCEL_CURRENT_MEMBERSHIP_SUCCESS, FETCH_USER_BILL_HISTORY_SUCCESS,
    FETCH_USER_MEMBERSHIP_SUCCESS
} from "./actionTypes";

const initState = {
    history: [],
    membership: {}
};

export default createReducer(fromJS(initState), {
    [FETCH_USER_BILL_HISTORY_SUCCESS](state, action) {
        const {result} = action;
        const {data, success} = result;
        if (!success) {
            return state;
        }

        const listHistory = fromJS(data);

        return state.set('history', listHistory);
    },
    [FETCH_USER_MEMBERSHIP_SUCCESS](state, action) {
        const {result} = action;
        const {data, success} = result;

        if (!success) {
            return state;
        }

        return state.set('membership', fromJS(data));
    },
    [CANCEL_CURRENT_MEMBERSHIP_SUCCESS](state, action) {
        const {result} = action;
        const {data, success} = result;

        if (!success || !data) {
            return state;
        }

        return state;
    }
});

export const getState = (state) => state.get('bill');