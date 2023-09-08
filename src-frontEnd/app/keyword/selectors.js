import {createSelector} from "reselect"
import {NAME} from "./constants"

export const getModule = (state) => {
    console.log(state);
    return state.get(NAME)
}

export const getKeywordOptions = createSelector(getModule, state => state.get('options'))

export const getSelectedOptions = createSelector(getModule, state => state.get('selected'))

export const getResultKeywords = createSelector(getModule, state => state.get('result'))

export const getListResultsKeyword = createSelector(getModule, state => state.get('results'))

export const getMetaResult = createSelector(getModule, state => state.get('meta'))
