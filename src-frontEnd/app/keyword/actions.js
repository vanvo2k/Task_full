import {_getListWords, _getOptions} from "../../services/KeywordServices"
import {
    FETCH_KEYWORD_OPTIONS_FAILURE, FETCH_KEYWORD_OPTIONS_REQUEST,
    FETCH_KEYWORD_OPTIONS_SUCCESS, FETCH_LIST_KEYWORDS_FAILURE, FETCH_LIST_KEYWORDS_REQUEST,
    FETCH_LIST_KEYWORDS_SUCCESS,
    KEYWORD_CHANGE_PAGINATION_NUMBER, KEYWORD_CHANGE_PAGINATION_PER_PAGE,
    KEYWORD_CHANGE_SELECT_OPTIONS
} from "./actionTypes"

export const fetchOptions = () => {
    return {
        types: [FETCH_KEYWORD_OPTIONS_REQUEST, FETCH_KEYWORD_OPTIONS_SUCCESS, FETCH_KEYWORD_OPTIONS_FAILURE],
        promise: _getOptions()
    }
}

export const changeSelectOptions = options => dispatch => {
    dispatch({
        type: KEYWORD_CHANGE_PAGINATION_NUMBER,
        page: 1
    })

    dispatch({
        type: KEYWORD_CHANGE_SELECT_OPTIONS,
        options,
    })

    return Promise.resolve(options)
}

export const fetchListKeywords = (args) => dispatch => {
    dispatch({
        type: FETCH_LIST_KEYWORDS_REQUEST,
        enableLoadingBar: true
    })

    return _getListWords(args)
        .then(result => {
            dispatch({
                type: FETCH_LIST_KEYWORDS_SUCCESS,
                result,
                enableLoadingBar: true
            })

            return Promise.resolve(result)
        })
        .catch(error => {
            dispatch({
                type: FETCH_LIST_KEYWORDS_FAILURE,
                error,
                enableLoadingBar: true
            })
        })
}

export const changePaginationNumber = page => dispatch => {
    dispatch({
        type: KEYWORD_CHANGE_PAGINATION_NUMBER,
        page
    })

    return Promise.resolve(page)
}

export const changePaginationPerPage = perPage => dispatch => {
    dispatch({
        type: KEYWORD_CHANGE_PAGINATION_PER_PAGE,
        perPage
    })

    return Promise.resolve(perPage)
}
