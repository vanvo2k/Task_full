import {
    REQUEST_OPEN_SIMILAR_PRODUCTS,
    TOGGLE_POPUP_SIMILAR_PRODUCTS
} from "./actionTypes"

export const requestOpenSimilarProducts = (productId) => dispatch => {
    dispatch({
        type: REQUEST_OPEN_SIMILAR_PRODUCTS,
        productId,
    })

    return Promise.resolve(true)
}

export const togglePopupSimilarProducts = () => dispatch => {
    dispatch({
        type: TOGGLE_POPUP_SIMILAR_PRODUCTS
    })

    return Promise.resolve(true)
}
