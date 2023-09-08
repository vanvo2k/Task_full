import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getModule = (state) => {
    return state.get(NAME);
};

export const getItemId = (state, props) => props.id;

export const getPlanDetail = createSelector([getModule, getItemId], (state, id) => {
    const byIds = state.get('byIds');

    return byIds.get(id);
});

export const getListPlans = createSelector(getModule, (state) => {
    return state.get('allIds');
});