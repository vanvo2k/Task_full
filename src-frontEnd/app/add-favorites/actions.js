import {CLOSE_POPUP_ADD_TO_FAVORITES, REQUEST_ADD_TO_FAVORITES} from "./actionTypes";

export const requestAddToFavorites = (productId) => dispatch => {
    dispatch({
        type: REQUEST_ADD_TO_FAVORITES,
        productId
    });

    return Promise.resolve(true);
};

export const closePopup = () => dispatch => {
    dispatch({
        type: CLOSE_POPUP_ADD_TO_FAVORITES
    });

    return Promise.resolve(true);
};