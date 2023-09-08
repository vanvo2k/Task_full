import AuthService from "../services/AuthServices";
import {
    AUTH_CHECK_STARTUP, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT,
} from "../constants/ActionTypes";
import {_logout} from "../services/AuthAPIServices";

export const authStartupCheck = () => dispatch => {
    dispatch({
        type: AUTH_CHECK_STARTUP
    });

    return AuthService.getStartup()
        .then(data => {
            if (data) {
                dispatch({
                    type: AUTH_LOGIN_SUCCESS,
                    data
                });
            }

            return Promise.resolve(data);
        });
};

export const logOut = () => dispatch => {
    _logout();

    return AuthService.logout()
        .then(() => {
            dispatch({
                type: AUTH_LOGOUT
            });

            return Promise.resolve();
        });
};