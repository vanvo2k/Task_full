import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getModule = (state) => {
    return state.get(NAME);
};

export const getCurrentProductToAdd = createSelector(getModule, state => state.get('productId'));

export const isOpenPopupAddToFavorites = createSelector(getModule, state => state.get('isOpen'));