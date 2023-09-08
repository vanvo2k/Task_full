import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {AUTH_SOCIAL_LOGIN} from "./actionTypes";
import {AUTH_FAILURE} from "../../constants/ActionTypes";

const initState = {
    message: '',
    loading: false
};

export default createReducer(fromJS(initState), {
    [AUTH_FAILURE](state, action) {
        const {message} = action;

        return state.set('message', message);
    },
    [AUTH_SOCIAL_LOGIN](state, action) {
        return state.set('message', '')
            .set('loading', true);
    }
});