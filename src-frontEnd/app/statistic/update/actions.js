import {
    FETCH_STATISTIC_UPDATE_FAILURE,
    FETCH_STATISTIC_UPDATE_REQUEST,
    FETCH_STATISTIC_UPDATE_SUCCESS
} from "./actionTypes";
import {_getStatisticUpdate} from "../../../services/ItemServices";

export const fetchStatisticUpdate = (date) => {
    return {
        types: [FETCH_STATISTIC_UPDATE_REQUEST, FETCH_STATISTIC_UPDATE_SUCCESS, FETCH_STATISTIC_UPDATE_FAILURE],
        promise: _getStatisticUpdate(date)
    }
};
