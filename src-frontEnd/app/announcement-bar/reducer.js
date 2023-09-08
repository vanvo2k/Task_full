import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {FETCH_ANNOUNCEMENT_BAR_SUCCESS, MARK_READ} from "./actionTypes";

const initState = {
    data: {
        id: '',
        link: '',
        buttonText: '',
        description: '',
    }
};

export default createReducer(fromJS(initState), {
    [FETCH_ANNOUNCEMENT_BAR_SUCCESS](state, action) {
        const {result} = action;
        const {data, success} = result;

        if (!success) {
            return state;
        }
        const {link, buttonText, _id, description} = data;

        return state.set('data', fromJS({
            link: link || '',
            buttonText: buttonText || '',
            id: _id || '',
            description: description || ''
        }));
    },
    [MARK_READ](state, action) {
        const {result} = action
        const {success} = result

        if (!success) {
            return state;
        }

        return state.set('data', fromJS({
            link: '',
            buttonText: '',
            id: '',
            description: ''
        }))
    }
});
