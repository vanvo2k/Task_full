import {FETCH_ITEM_DETAIL_FAILURE, FETCH_ITEM_DETAIL_REQUEST, FETCH_ITEM_DETAIL_SUCCESS,} from "./actionTypes";
import {_getProductDetail} from "../../services/ProductServices";

export const fetchItemDetail = (productId) => {
    return {
        types: [FETCH_ITEM_DETAIL_REQUEST, FETCH_ITEM_DETAIL_SUCCESS, FETCH_ITEM_DETAIL_FAILURE],
        promise: _getProductDetail(productId),
        enableLoadingBar: true
    };
};

