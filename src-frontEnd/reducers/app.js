import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {FETCH_APP_DATA_SUCCESS, FETCH_CURRENT_APP_DATA} from "../constants/ActionTypes";

const initState = {
    old: {},
    new: {}
};

export default createReducer(fromJS(initState), {
    [FETCH_CURRENT_APP_DATA](state, action) {
        const {data} = action;

        return state.set('old', fromJS(data));
    },
    [FETCH_APP_DATA_SUCCESS](state, action) {
        const {result} = action;
        const {data} = result;
        const {value} = data;

        return state.set('new', fromJS(value));
    }
});

export const getState = (state) => state.get('app');