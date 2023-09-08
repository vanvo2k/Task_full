import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {FETCH_USER_PROFILE_SUCCESS} from "./actionTypes";

const initState = {};

export default createReducer(fromJS(initState), {
    [FETCH_USER_PROFILE_SUCCESS](state, action) {
        const {result} = action;
        const {profile} = result;

        return fromJS(profile);
    }
});

export const getState = (state) => state.get('profile');