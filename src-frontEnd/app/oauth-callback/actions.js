import AuthService from "../../services/AuthServices";
import {AUTH_LOGIN_SUCCESS} from "./actionTypes";

export const oauthCallback = (history) => dispatch => {
    return AuthService.handleOauthCallback(history)
        .then((data) => {
            dispatch({
                type: AUTH_LOGIN_SUCCESS,
                data
            });

            return Promise.resolve(data);
        });
};