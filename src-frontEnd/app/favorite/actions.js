import {
    CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
    CHANGE_PAGINATION_ITEMS_PER_PAGE,
    CLOSE_MODAL_ITEM_DETAIL,
    FETCH_ITEM_DETAIL_FAILURE,
    FETCH_ITEM_DETAIL_REQUEST,
    FETCH_ITEM_DETAIL_SUCCESS,
    FETCH_LIST_FAVORITE_ITEMS_FAILURE,
    FETCH_LIST_FAVORITE_ITEMS_REQUEST,
    FETCH_LIST_FAVORITE_ITEMS_SUCCESS,
    SHOW_ITEM_DETAIL,
    INIT_SETUP_META,
    CHANGE_FIELD_NAME_SORT_BY
} from "./actionTypes";
import {getPaginationControlData} from "./selectors";
import {_getProductsByCategory} from "../../services/FavoriteServices";
import {_getProductDetail} from "../../services/ProductServices";
import {parseSearchQuery} from "../../helpers/RouterHelper";
import isEmpty from "lodash/isEmpty";

export const fetchProducts = (categoryId, sortBy = '') => (dispatch, getState) => {
    const state = getState();
    const paginationData = getPaginationControlData(state);
    const {page, perPage} = paginationData.toJS();

    const args = Object.assign({limit: 10, page: 1}, {
        page,
        limit: perPage,
        categoryId,
        sortBy
    });

    dispatch({
        type: FETCH_LIST_FAVORITE_ITEMS_REQUEST,
        enableLoadingBar: true
    });

    return _getProductsByCategory(args)
        .then(result => {
            dispatch({
                type: FETCH_LIST_FAVORITE_ITEMS_SUCCESS,
                result,
                enableLoadingBar: true
            });

            return Promise.resolve(result);
        })
        .catch(error => {
            dispatch({
                type: FETCH_LIST_FAVORITE_ITEMS_FAILURE,
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

export const changePaginationNumber = (page) => dispatch => {
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

export const initCheckQuerySearch = (history) => dispatch => {
    dispatch({
        type: INIT_SETUP_META
    });

    const query = parseSearchQuery(history);
    if (isEmpty(query)) {
        return Promise.resolve(query);
    }

    const {page, sortByField} = query;

    if (page && !isNaN(page)) {
        dispatch({
            type: CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
            page: parseInt(page, 10)
        });
    }

    if (sortByField) {
        dispatch({
            type: CHANGE_FIELD_NAME_SORT_BY,
            field: sortByField
        });
    }

    return Promise.resolve(query)
}