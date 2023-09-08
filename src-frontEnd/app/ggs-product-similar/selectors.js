import {createSelector} from "reselect"
import {NAME} from "./constants"

export const getModule = (state) => {
    return state.get(NAME)
}

export const getCurrentProductToQuery = createSelector(getModule, state => state.get('productId'))

export const isOpenPopupSimilarProducts = createSelector(getModule, state => state.get('isOpen'))
