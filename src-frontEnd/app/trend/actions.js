import {
    CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
    CHANGE_PAGINATION_ITEMS_PER_PAGE,
    CLOSE_MODAL_ITEM_DETAIL,
    FETCH_ITEM_DETAIL_FAILURE,
    FETCH_ITEM_DETAIL_REQUEST,
    FETCH_ITEM_DETAIL_SUCCESS,
    FETCH_LIST_TREND_ITEMS_FAILURE,
    FETCH_LIST_TREND_ITEMS_REQUEST,
    FETCH_LIST_TREND_ITEMS_SUCCESS,
    FETCH_TOTAL_FAVORITE_ITEMS_FAILURE,
    FETCH_TOTAL_FAVORITE_ITEMS_REQUEST,
    FETCH_TOTAL_FAVORITE_ITEMS_SUCCESS,
    SHOW_ITEM_DETAIL
} from "./actionTypes";
import {changeQuerySearch} from "../../helpers/RouterHelper";
import {getMetaListItems, getPaginationControlData} from "./selectors";
import {_getTotalFavoriteItems} from "../../services/FavoriteServices";
import {_getProductDetail, _getTrendProducts} from "../../services/ProductServices";

export const fetchItems = () => (dispatch, getState) => {
    const state = getState();

    const metaData = getMetaListItems(state);
    const paginationData = getPaginationControlData(state);

    const query = metaData.get('query').toJS();
    const {page, perPage} = paginationData.toJS();

    const args = Object.assign({limit: 10, page: 1, query: {}}, {
        page, query, limit: perPage
    });

    dispatch({
        type: FETCH_LIST_TREND_ITEMS_REQUEST,
        enableLoadingBar: true
    });

    return _getTrendProducts(args)
        .then(result => {
            dispatch({
                type: FETCH_LIST_TREND_ITEMS_SUCCESS,
                result,
                enableLoadingBar: true
            });

            return Promise.resolve(result);
        })
        .catch(error => {
            dispatch({
                type: FETCH_LIST_TREND_ITEMS_FAILURE,
                error,
                enableLoadingBar: true
            });

            return Promise.resolve();
        });
};

export const fetchItemDetail = (productId) => {
    return {
        types: [FETCH_ITEM_DETAIL_REQUEST, FETCH_ITEM_DETAIL_SUCCESS, FETCH_ITEM_DETAIL_FAILURE],
        promise: _getProductDetail(productId),
        productId,
    };
};

export const fetchTotalItems = () => {
    return {
        promise: _getTotalFavoriteItems(),
        types: [FETCH_TOTAL_FAVORITE_ITEMS_REQUEST, FETCH_TOTAL_FAVORITE_ITEMS_SUCCESS, FETCH_TOTAL_FAVORITE_ITEMS_FAILURE]
    };
};

export const changePaginationNumber = (page, history = null) => dispatch => {
    if (history) {
        changeQuerySearch(history)({page});
    }

    dispatch({
        type: CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
        page
    });

    return Promise.resolve(page);
};

export const changePaginationPerPage = (number) => dispatch => {
    dispatch({
        type: CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
        page: 1
    });

    dispatch({
        type: CHANGE_PAGINATION_ITEMS_PER_PAGE,
        number
    });

    return Promise.resolve(number);
};

export const showItemDetail = ({id, index}) => dispatch => {
    dispatch({
        type: SHOW_ITEM_DETAIL,
        data: {id, index}
    });

    return dispatch(fetchItemDetail(id));
};

export const closeModalItemDetail = () => dispatch => {
    dispatch({
        type: CLOSE_MODAL_ITEM_DETAIL
    });

    return Promise.resolve();
};