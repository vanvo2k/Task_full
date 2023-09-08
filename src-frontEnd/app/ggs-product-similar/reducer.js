import {createReducer} from "redux-create-reducer"
import {fromJS} from "immutable"
import {
    GGS_REQUEST_OPEN_SIMILAR_PRODUCTS,
    GGS_TOGGLE_POPUP_SIMILAR_PRODUCTS
} from "./actionTypes"

const initRootState = {
    productId: '',
    isOpen: false
}

export default createReducer(fromJS(initRootState), {
    [GGS_REQUEST_OPEN_SIMILAR_PRODUCTS](state, action) {
        const {productId} = action

        return state.set('productId', productId)
            .set('isOpen', true)
    },
    [GGS_TOGGLE_POPUP_SIMILAR_PRODUCTS](state, action) {
        return state.set('isOpen', !state.get('isOpen'))
    }
})
