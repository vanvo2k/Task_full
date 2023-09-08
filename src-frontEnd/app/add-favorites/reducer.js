import {createReducer} from "redux-create-reducer"
import {fromJS} from "immutable"
import {CLOSE_POPUP_ADD_TO_FAVORITES, REQUEST_ADD_TO_FAVORITES} from "./actionTypes"

const initRootState = {
    productId: '',
    isOpen: false
}

export default createReducer(fromJS(initRootState), {
    [REQUEST_ADD_TO_FAVORITES](state, action) {
        const {productId} = action

        if (state.get('isOpen')) {
            return state.set('isOpen', false)
        }

        return state.set('productId', productId)
            .set('isOpen', true)
    },
    [CLOSE_POPUP_ADD_TO_FAVORITES](state, action) {
        return state.set('isOpen', false)
    }
})
