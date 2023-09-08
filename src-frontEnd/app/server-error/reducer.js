import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {SHOW_SERVER_ERROR, TOGGLE_MODAL_SERVER_ERROR} from "./actionTypes";

const initState = {
    errors: [],
    isOpen: false,
    countError: 0,
};

export default createReducer(fromJS(initState), {
    [TOGGLE_MODAL_SERVER_ERROR](state, action) {
        const isOpen = state.get('isOpen');
        const countError = state.get('countError');

        return state.set('isOpen', !isOpen)
            .set('countError', isOpen ? 0 : countError);
    },
    [SHOW_SERVER_ERROR](state, action) {
        const {message, title} = action.data;
        const count = state.get('countError');
        const errors = state.get('errors');

        return state
            .set('countError', count + 1)
            .set('message', message)
            .set('title', title || 'Unexpected Error')
            .set('isOpen', true)
            .set('errors', errors.push(fromJS({title, message})));
    }
});