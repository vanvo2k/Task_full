import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getModule = (state) => {
    return state.get(NAME);
};

export const getItemDetail = createSelector(getModule, state => state.get('item'));

export const getItemLiked = createSelector(getModule, state => state.get('liked'));