import {
    GGS_REQUEST_OPEN_SIMILAR_PRODUCTS,
    GGS_TOGGLE_POPUP_SIMILAR_PRODUCTS
} from "./actionTypes"

export const requestOpenSimilarProducts = (productId) => dispatch => {
    dispatch({
        type: GGS_REQUEST_OPEN_SIMILAR_PRODUCTS,
        productId,
    })

    return Promise.resolve(true)
}

export const togglePopupSimilarProducts = () => dispatch => {
    dispatch({
        type: GGS_TOGGLE_POPUP_SIMILAR_PRODUCTS
    })

    return Promise.resolve(true)
}
