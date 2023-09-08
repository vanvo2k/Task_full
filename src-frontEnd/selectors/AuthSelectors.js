import {createSelector} from "reselect";

import * as auth from "../reducers/auth";

export const isAuthenticated = createSelector([auth.getState], (state) => {
    const token = state.get('access_token') || '';

    return !!token;
});

export const getAccessToken = createSelector([auth.getState], (state) => {
    return state.get('access_token') || '';
});