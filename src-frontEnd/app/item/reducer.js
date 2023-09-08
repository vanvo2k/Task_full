import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {
    FETCH_ITEM_DETAIL_SUCCESS,
} from "./actionTypes";

const initState = {
    item: {},
};

export default createReducer(fromJS(initState), {
    [FETCH_ITEM_DETAIL_SUCCESS](state, action) {
        const {result} = action;
        const {data, success} = result;
        if (!success) {
            return state;
        }

        return state.set('item', fromJS(data));
    }
});