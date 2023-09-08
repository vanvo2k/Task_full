import {createReducer} from "redux-create-reducer";
import {combineReducers} from "redux-immutable";
import {fromJS} from "immutable";

import {
    CLOSE_EVENT_DETAIL,
    OPEN_EVENT_DETAIL,
} from "./actionTypes";

const initEventState = {
    id: '',
    isOpen: false,
    event: {}
};

const event = createReducer(fromJS(initEventState), {
    [OPEN_EVENT_DETAIL](state, action) {
        const {event} = action;
        return state
            .set('id', event.id)
            .set('isOpen', true)
            .set('event', event);
    },

    [CLOSE_EVENT_DETAIL](state, action) {
        return state
            .set('id', '')
            .set('isOpen', false)
            .set('event', fromJS({}));
    }
});

export default combineReducers({
    event
});
