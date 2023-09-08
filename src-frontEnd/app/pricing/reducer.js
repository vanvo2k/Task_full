import {createReducer} from "redux-create-reducer";
import {combineReducers} from "redux-immutable";
import {Map, List, fromJS} from "immutable";
import {FETCH_PLANS_SUCCESS} from "./actionTypes";

const byIds = createReducer(Map(), {
    [FETCH_PLANS_SUCCESS](state, action) {
        const {result} = action;
        const {success, data} = result;

        if (!success) {
            return state;
        }

        data.forEach((plan) => {
            state = state.set(plan._id, fromJS(plan));
        });

        return state;
    }
});

const allIds = createReducer(List(), {
    [FETCH_PLANS_SUCCESS](state, action) {
        const {result} = action;
        const {success, data} = result;

        if (!success) {
            return state;
        }

        let list = List();
        data.forEach((plan) => {
            list = list.push(plan._id);
        });

        return list;
    }
});

export default combineReducers({
    byIds,
    allIds
});