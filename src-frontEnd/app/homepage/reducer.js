import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {combineReducers} from "redux-immutable";
import {FETCH_TOTAL_ITEMS_SUCCESS} from "../search/actionTypes";

import {NAME} from "./constants";

const initState = {
    totalItems: 0
};

const homepage = createReducer(fromJS(initState), {
    [FETCH_TOTAL_ITEMS_SUCCESS](state, action) {
        const {result} = action;
        const {success, data} = result;

        if (!success) {
            return state;
        }

        return state.set('totalItems', data);
    }
});

export default combineReducers({
    [NAME]: homepage
})