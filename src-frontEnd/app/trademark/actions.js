import {
    CHANGE_CURRENT_PAGE,
    CHANGE_INPUT_CREATE_TRADEMARK, CHANGE_SORT_BY,
    CREATE_NEW_TRADEMARK_FAILURE,
    CREATE_NEW_TRADEMARK_REQUEST, CREATE_NEW_TRADEMARK_SUCCESS, DELETE_TRADEMARK_FAILURE, DELETE_TRADEMARK_REQUEST,
    DELETE_TRADEMARK_SUCCESS,
    FETCH_LIST_TRADEMARKS_FAILURE, FETCH_LIST_TRADEMARKS_REQUEST, FETCH_LIST_TRADEMARKS_SUCCESS,
    FETCH_STATISTIC_FAILURE,
    FETCH_STATISTIC_REQUEST, FETCH_STATISTIC_SUCCESS, FETCH_TOTAL_WARNINGS_FAILURE, FETCH_TOTAL_WARNINGS_REQUEST,
    FETCH_TOTAL_WARNINGS_SUCCESS, FETCH_TRADEMARK_DETAIL_FAILURE, FETCH_TRADEMARK_DETAIL_REQUEST,
    FETCH_TRADEMARK_DETAIL_SUCCESS, HIDE_TRADEMARK_RESULTS, MARK_READ_TRADEMARK_FAILURE, MARK_READ_TRADEMARK_REQUEST,
    MARK_READ_TRADEMARK_SUCCESS,
    REFRESH_TRADEMARK_FAILURE,
    REFRESH_TRADEMARK_REQUEST, REFRESH_TRADEMARK_SUCCESS, SHOW_TRADEMARK_RESULTS,
    TOGGLE_UPGRADE_POPUP,
    OPEN_TRADEMARK_RESULTS,
    CHANGE_TOTAL_TRIAL,
    CHANGE_TOTAL_TRADEMARK
} from "./actionTypes"
import {
    _createTradeMark, _deleteTradeMark, _getListTradeMarks, _getStatisticTrademark, _getTotalWarnings,
    _getTrademarkDetail, _markReadTrademark,
    _refreshManualTradeMark
} from "../../services/TradeMarkServices"
import {getMetaData, getSortData} from "./selectors"

export const toggleUpgradePopup = ()=>(dispatch)=>{
    dispatch({
        type: TOGGLE_UPGRADE_POPUP
    })

}

export const fetchListTradeMark = () => (dispatch, getState) => {
    const rootState = getState()
    const meta = getMetaData(rootState)
    const sort = getSortData(rootState)

    const page = meta.get('page')
    const limit = meta.get('limit')

    dispatch({
        type: FETCH_LIST_TRADEMARKS_REQUEST
    })

    const args = {
        page,
        limit,
        sortBy: sort.get('by')
    }

    return _getListTradeMarks(args)
        .then(result => {
            dispatch({
                type: FETCH_LIST_TRADEMARKS_SUCCESS,
                result,
            })

            return Promise.resolve(result)
        })
        .catch(error => {
            dispatch({
                type: FETCH_LIST_TRADEMARKS_FAILURE,
                error,
            })

            return Promise.reject(error)
        })
}

export const changeInputCreateTradeMark = (text) => {
    return {
        type: CHANGE_INPUT_CREATE_TRADEMARK,
        text
    }
}

export const createNewTradeMark = (text) => {
    return {
        types: [CREATE_NEW_TRADEMARK_REQUEST, CREATE_NEW_TRADEMARK_SUCCESS, CREATE_NEW_TRADEMARK_FAILURE],
        promise: _createTradeMark({text})
    }
}

export const deleteTradeMark = (id) => {
    return {
        id,
        types: [DELETE_TRADEMARK_REQUEST, DELETE_TRADEMARK_SUCCESS, DELETE_TRADEMARK_FAILURE],
        promise: _deleteTradeMark(id)
    }
}

export const requestRefreshManual = (id) => {
    return {
        id,
        types: [REFRESH_TRADEMARK_REQUEST, REFRESH_TRADEMARK_SUCCESS, REFRESH_TRADEMARK_FAILURE],
        promise: _refreshManualTradeMark(id)
    }
}

export const requestStatistic = () => {
    return {
        types: [FETCH_STATISTIC_REQUEST, FETCH_STATISTIC_SUCCESS, FETCH_STATISTIC_FAILURE],
        promise: _getStatisticTrademark()
    }
}

export const fetchTotalWarnings = () => {
    return {
        types: [FETCH_TOTAL_WARNINGS_REQUEST, FETCH_TOTAL_WARNINGS_SUCCESS, FETCH_TOTAL_WARNINGS_FAILURE],
        promise: _getTotalWarnings()
    }
}

export const fetchTrademarkDetail = (id) => {
    return {
        id,
        types: [FETCH_TRADEMARK_DETAIL_REQUEST, FETCH_TRADEMARK_DETAIL_SUCCESS, FETCH_TRADEMARK_DETAIL_FAILURE],
        promise: _getTrademarkDetail(id)
    }
}

export const markReadTrademark = (id) => {
    return {
        id,
        types: [MARK_READ_TRADEMARK_REQUEST, MARK_READ_TRADEMARK_SUCCESS, MARK_READ_TRADEMARK_FAILURE],
        promise: _markReadTrademark(id)
    }
}

export const changeCurrentPage = (page) => dispatch => {
    dispatch({
        type: CHANGE_CURRENT_PAGE,
        page,
    })

    return Promise.resolve(page)
}

export const changeSortBy = (by) => dispatch => {
    dispatch({
        type: CHANGE_SORT_BY,
        by,
    })

    return Promise.resolve(by)
}

export const showTrademarkResults = (id) => dispatch => {
    dispatch({
        type: SHOW_TRADEMARK_RESULTS,
        id,
    })

    return Promise.resolve(id)
}

export const hideTrademarkResults = () => dispatch => {
    dispatch({
        type: HIDE_TRADEMARK_RESULTS,
    })

    return Promise.resolve()
}

export const openTrademarkResults = () => dispatch => {
    dispatch({
        type: OPEN_TRADEMARK_RESULTS,
    })

    return Promise.resolve()
}

export const changeTotalTrial = () => dispatch => {
    dispatch({
        type: CHANGE_TOTAL_TRIAL,
    })

    // return Promise.resolve()
}
export const changeTotalTradeMark = () => dispatch => {
    dispatch({
        type: CHANGE_TOTAL_TRADEMARK,
    })

    // return Promise.resolve()
}