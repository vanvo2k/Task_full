import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {FETCH_NOTIFICATION_BAR_SUCCESS} from "./actionTypes";

const initState = {
    data: {
        message: '',
        link: '',
        buttonText: ''
    }
};

export default createReducer(fromJS(initState), {
    [FETCH_NOTIFICATION_BAR_SUCCESS](state, action) {
        const {result} = action;
        const {data, success} = result;

        if (!success) {
            return state;
        }

        const {message, link, buttonText} = data;

        return state.set('data', fromJS({
            message: message || '',
            link: link || '',
            buttonText: buttonText || ''
        }));
    }
});
