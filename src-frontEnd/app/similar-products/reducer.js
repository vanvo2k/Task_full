import {createReducer} from "redux-create-reducer"
import {fromJS} from "immutable"
import {
    REQUEST_OPEN_SIMILAR_PRODUCTS,
    TOGGLE_POPUP_SIMILAR_PRODUCTS
} from "./actionTypes"

const initRootState = {
    productId: '',
    isOpen: false
}

export default createReducer(fromJS(initRootState), {
    [REQUEST_OPEN_SIMILAR_PRODUCTS](state, action) {
        const {productId} = action

        return state.set('productId', productId)
            .set('isOpen', true)
    },
    [TOGGLE_POPUP_SIMILAR_PRODUCTS](state, action) {
        return state.set('isOpen', !state.get('isOpen'))
    }
})
