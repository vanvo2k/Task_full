import {createReducer} from "redux-create-reducer"
import {fromJS} from "immutable"
import {
    FETCH_KEYWORD_OPTIONS_SUCCESS, FETCH_LIST_KEYWORDS_SUCCESS, KEYWORD_CHANGE_PAGINATION_NUMBER,
    KEYWORD_CHANGE_PAGINATION_PER_PAGE,
    KEYWORD_CHANGE_SELECT_OPTIONS
} from "./actionTypes"

const initState = {
    options: {
        maxRank: [],
        count: []
    },
    selected: {},
    results: {},
    meta: {
        limit: 10,
        page: 1,
        pages: 0,
        total: 0
    }
}

export default createReducer(fromJS(initState), {
    [FETCH_KEYWORD_OPTIONS_SUCCESS](state, action) {
        const {result} = action
        const {data} = result

        return state.set('options', fromJS(data))
    },
    [KEYWORD_CHANGE_SELECT_OPTIONS](state, action) {
        const {options} = action

        return state.set('selected', state.get('selected').merge(fromJS(options)))
    },
    [FETCH_LIST_KEYWORDS_SUCCESS](state, action) {
        const {result} = action
        const {data} = result
        const {results, meta} = data

        return state
            .set('meta', fromJS(meta))
            .set('results', fromJS(results))
    },
    [KEYWORD_CHANGE_PAGINATION_NUMBER](state, action) {
        const {page} = action

        return state.setIn(['meta', 'page'], parseInt(page, 10))
    },
    [KEYWORD_CHANGE_PAGINATION_PER_PAGE](state, action) {
        const {perPage} = action

        return state
            .setIn(['meta', 'limit'], parseInt(perPage, 10))
            .setIn(['meta', 'page'], 1)
    }
})
