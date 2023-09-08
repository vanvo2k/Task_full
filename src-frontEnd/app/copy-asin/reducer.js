import {createReducer} from "redux-create-reducer"
import {fromJS} from "immutable"
import {DISPLAY_ALERT, CLOSE_ALERT} from "./actionTypes";

const initRootState = {
    isAlert: false
}

export default createReducer(fromJS(initRootState), {
    [DISPLAY_ALERT](state, action) {
        return state.set('isAlert', true)
    },
    [CLOSE_ALERT](state, action) {
        return state.set('isAlert', false)
    }
})