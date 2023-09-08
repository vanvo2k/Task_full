import {GGS_FETCH_ITEM_DETAIL_FAILURE, GGS_FETCH_ITEM_DETAIL_REQUEST, GGS_FETCH_ITEM_DETAIL_SUCCESS,} from "./actionTypes";
import {_getGgsProductDetail} from "../../services/GgsProductServices";

export const fetchItemDetail = (productId) => {
    return {
        types: [GGS_FETCH_ITEM_DETAIL_REQUEST, GGS_FETCH_ITEM_DETAIL_SUCCESS, GGS_FETCH_ITEM_DETAIL_FAILURE],
        promise: _getGgsProductDetail(productId),
        enableLoadingBar: true
    };
};

