import {_saveSettings} from "../services/UserService"
import {
    HEART_BEAT_FAILURE,
    HEART_BEAT_REQUEST, HEART_BEAT_SUCCESS,
    SAVE_USER_SETTINGS_FAILURE, SAVE_USER_SETTINGS_REQUEST, SAVE_USER_SETTINGS_SUCCESS
} from "../constants/ActionTypes"
import StorageService from "../services/StorageServices"
import {_getHeartbeat} from "../services/AuthAPIServices"

export const saveUserSettings = (settings) => {
    return {
        types: [SAVE_USER_SETTINGS_REQUEST, SAVE_USER_SETTINGS_SUCCESS, SAVE_USER_SETTINGS_FAILURE],
        promise: _saveSettings(settings)
            .then(settings => {
                StorageService.saveUserSettings(settings)

                return Promise.resolve(settings)
            })
    }
}

export const heartbeat = () => dispatch => {
    dispatch({
        type: HEART_BEAT_REQUEST
    })

    return _getHeartbeat()
        .then(result => {
            const {success, data} = result

            if (success) {
                const {scopes, roles} = data

                StorageService.updateUserScopes(scopes || [])
                StorageService.updateUserRoles(roles || [])
            }

            dispatch({
                type: HEART_BEAT_SUCCESS,
                result
            })

            return Promise.resolve(result)
        })
        .catch(error => {
            dispatch({
                type: HEART_BEAT_FAILURE,
                error
            })

            return Promise.reject(error)
        })
}
