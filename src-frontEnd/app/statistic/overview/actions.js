import {
    FETCH_STATISTIC_HAS_RANK_FAILURE,
    FETCH_STATISTIC_HAS_RANK_REQUEST, FETCH_STATISTIC_HAS_RANK_SUCCESS,
    FETCH_STATISTIC_OVERVIEW_FAILURE, FETCH_STATISTIC_OVERVIEW_REQUEST,
    FETCH_STATISTIC_OVERVIEW_SUCCESS, STATISTIC_CHANGE_SELECT_DAYS
} from "./actionTypes";
import {_getStatisticHasRank, _getStatisticOverview} from "../../../services/ItemServices";

export const fetchStatisticOverview = (from) => {
    return {
        types: [FETCH_STATISTIC_OVERVIEW_REQUEST, FETCH_STATISTIC_OVERVIEW_SUCCESS, FETCH_STATISTIC_OVERVIEW_FAILURE],
        promise: _getStatisticOverview(from)
    }
};

export const fetchStatisticHasRank = (from) => {
    return {
        types: [FETCH_STATISTIC_HAS_RANK_REQUEST, FETCH_STATISTIC_HAS_RANK_SUCCESS, FETCH_STATISTIC_HAS_RANK_FAILURE],
        promise: _getStatisticHasRank(from)
    }
};

export const changeShowDays = days => dispatch => {
    dispatch({
        type: STATISTIC_CHANGE_SELECT_DAYS,
        days
    });

    return Promise.resolve(days);
};