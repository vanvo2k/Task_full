import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {AUTH_LOGIN_SUCCESS, HEART_BEAT_SUCCESS} from "../constants/ActionTypes";

const initState = {};

export default createReducer(fromJS(initState), {
    [AUTH_LOGIN_SUCCESS](state, action) {
        const {data} = action;
        const {profile} = data;

        if (typeof profile !== "object") {
            return state;
        }

        return fromJS(profile);
    },
    [HEART_BEAT_SUCCESS](state, action) {
        const {result} = action;

        const {success, data} = result;

        if (!success) {
            return state;
        }

        const {scopes, roles} = data;

        return state
            .set('scopes', fromJS(scopes))
            .set('roles', fromJS(roles));
    }
});

export const getState = (state) => state.get('user');