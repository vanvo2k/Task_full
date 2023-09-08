import {
    FETCH_APP_DATA_FAILURE, FETCH_APP_DATA_REQUEST, FETCH_APP_DATA_SUCCESS,
    FETCH_CURRENT_APP_DATA, FETCH_FORCE_REFRESH_FAILURE, FETCH_FORCE_REFRESH_REQUEST, FETCH_FORCE_REFRESH_SUCCESS
} from "../constants/ActionTypes";
import {_getForceRefreshApp, _getSettingByKey} from "../services/SettingServices";
import StorageService from "../services/StorageServices";

export const fetchCurrentAppData = () => dispatch => {
    const appData = StorageService.get('app', {});
    const data = typeof appData === 'object' ? appData : {};

    dispatch({
        type: FETCH_CURRENT_APP_DATA,
        data
    });

    return Promise.resolve(appData);
};

export const fetchAppData = () => {
    return {
        types: [FETCH_APP_DATA_REQUEST, FETCH_APP_DATA_SUCCESS, FETCH_APP_DATA_FAILURE],
        promise: _getSettingByKey('app')
    }
};

export const fetchForceRefreshApp = () => {
    return {
        types: [FETCH_FORCE_REFRESH_REQUEST, FETCH_FORCE_REFRESH_SUCCESS, FETCH_FORCE_REFRESH_FAILURE],
        promise: _getForceRefreshApp()
    }
};

export const storeAppData = (appData) => dispatch => {
    StorageService.set('app', appData);

    return Promise.resolve(appData);
};

