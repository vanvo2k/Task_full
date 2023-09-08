import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";

import {AUTH_CHANGE_ACCESS_TOKEN, AUTH_FAILURE, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT} from "../constants/ActionTypes";

const initState = {
    access_token: ''
};

export default createReducer(fromJS(initState), {
    [AUTH_LOGOUT](state, action) {
        return fromJS(initState);
    },
    [AUTH_FAILURE](state, action) {
        return fromJS(initState);
    },
    [AUTH_LOGIN_SUCCESS](state, action) {
        const {data} = action;
        const {access_token} = data;

        return state
            .set('access_token', access_token);
    },
    [AUTH_CHANGE_ACCESS_TOKEN](state, action) {
        const {token} = action;

        return state.set('access_token', token);
    }
});

export const getState = (state) => state.get('auth');