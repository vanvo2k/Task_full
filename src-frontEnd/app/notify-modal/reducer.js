import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {HIDE_NOTIFY, SHOW_NOTIFY} from "./actionTypes";

const initState = {
    isOpen: false,
    title: '',
    content: '',
    button: '',
    upgradePlan: false,
    refresh: false
};

export default createReducer(fromJS(initState), {
    [SHOW_NOTIFY](state, action) {
        const {data} = action;

        return state
            .merge(fromJS(data))
            .set('isOpen', true);
    },
    [HIDE_NOTIFY](state, action) {
        return state.set('isOpen', false);
    }
});
