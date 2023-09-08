import APIService from "./APIServices"
import {DELETE, GET, PATCH, POST} from "../constants/HTTPConstants"

export const _getFavoriteItems = (args) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/favorites',
        data: args
    })
}

export const _getTotalFavoriteItems = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/favorites/total'
    })
}

export const _createCategoryFavorite = (title = '', productId = '', ASIN = '') => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/favorites/categories',
        data: {
            title,
            productId,
            import: ASIN,
        }
    })
}

export const _getListCategoriesFavorite = ({productId = '', term = ''}) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/favorites/categories',
        params: {
            productId,
            term
        }
    })
}

export const _deleteCategoryFavorite = (categoryId) => {
    return APIService.makeAuthRequest({
        method: DELETE,
        url: `/favorites/categories/${categoryId}`
    })
}

export const _toggleProductFavorite = ({productId, categoryId}) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/favorite-products/toggle',
        data: {
            productId,
            categoryId
        }
    })
}

export const _getCategoryFavoriteDetails = (categoryId) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/favorites/categories/${categoryId}`,
    })
}

export const _updateCategoryFavorite = ({categoryId, data}) => {
    return APIService.makeAuthRequest({
        method: PATCH,
        url: `/favorites/categories/${categoryId}`,
        data
    })
}

export const _getProductsByCategory = ({categoryId, page = 1, limit = 1000, sortBy}) => {
    if (!sortBy) sortBy = 'added_date'
    return APIService.makeAuthRequest({
        method: GET,
        url: `/favorites/categories/${categoryId}/products`,
        params: {
            page,
            limit,
            sortBy
        }
    })
}

export const _getTotalProductsByCategory = (categoryId) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/favorites/categories/${categoryId}/total`,
    })
}

export const _getTotalIgnoreItems = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/ignores/total'
    })
}

export const _toggleProductIgnore = (productId) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/ignore-products/toggle',
        data: {
            productId,
        } 
    })
}

export const _getProductsIgnore = ({page = 1, limit = 1000, sortBy}) => {
    if (!sortBy) sortBy = 'added_date'
    return APIService.makeAuthRequest({
        method: GET,
        url: `/ignores/products/`,
        params: {
            page,
            limit,
            sortBy
        }
    })
}


