import {
    _getItemsBestSellerRank,
    _getItemsRandom,
    _getItemsTopRising, _getStatisticItemTypes, _getStatisticRankRanges
} from "../../services/ItemServices";
import {
    FETCH_ITEMS_TOP_RISING_FAILURE,
    FETCH_ITEMS_TOP_RISING_REQUEST, FETCH_ITEMS_TOP_RISING_SUCCESS, FETCH_ITEMS_TOP_RANK_FAILURE,
    FETCH_ITEMS_TOP_RANK_REQUEST,
    FETCH_ITEMS_TOP_RANK_SUCCESS,
    FETCH_STATISTIC_ITEM_TYPES_FAILURE,
    FETCH_STATISTIC_ITEM_TYPES_REQUEST, FETCH_STATISTIC_ITEM_TYPES_SUCCESS,
    FETCH_STATISTIC_RANK_RANGES_FAILURE, FETCH_STATISTIC_RANK_RANGES_REQUEST,
    FETCH_STATISTIC_RANK_RANGES_SUCCESS, FETCH_ITEMS_RANDOM_REQUEST, FETCH_ITEMS_RANDOM_SUCCESS,
    FETCH_ITEMS_RANDOM_FAILURE
} from "./actionTypes";

export const fetchStatisticRankRanges = () => {
    return {
        types: [FETCH_STATISTIC_RANK_RANGES_REQUEST, FETCH_STATISTIC_RANK_RANGES_SUCCESS, FETCH_STATISTIC_RANK_RANGES_FAILURE],
        promise: _getStatisticRankRanges()
    }
};

export const fetchStatisticItemTypes = () => {
    return {
        types: [FETCH_STATISTIC_ITEM_TYPES_REQUEST, FETCH_STATISTIC_ITEM_TYPES_SUCCESS, FETCH_STATISTIC_ITEM_TYPES_FAILURE],
        promise: _getStatisticItemTypes()
    }
};

export const fetchItemsTopRising = () => {
    return {
        types: [FETCH_ITEMS_TOP_RISING_REQUEST, FETCH_ITEMS_TOP_RISING_SUCCESS, FETCH_ITEMS_TOP_RISING_FAILURE],
        promise: _getItemsTopRising()
    }
};

export const fetchItemsTopRanking = () => {
    return {
        types: [FETCH_ITEMS_TOP_RANK_REQUEST, FETCH_ITEMS_TOP_RANK_SUCCESS, FETCH_ITEMS_TOP_RANK_FAILURE],
        promise: _getItemsBestSellerRank()
    }
};

export const fetchItemsRandom = () => {
    return {
        types: [FETCH_ITEMS_RANDOM_REQUEST, FETCH_ITEMS_RANDOM_SUCCESS, FETCH_ITEMS_RANDOM_FAILURE],
        promise: _getItemsRandom()
    }
};