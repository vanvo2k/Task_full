import {createSelector} from "reselect";

import {getState} from "../reducers/theme";

export const getThemeData = createSelector(getState, theme => theme);