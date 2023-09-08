import {AUTH_SOCIAL_LOGIN} from "./actionTypes";
import AuthService from "../../services/AuthServices";

export const socialLogin = (provider) => dispatch => {
    dispatch({
        type: AUTH_SOCIAL_LOGIN,
        provider
    });

    AuthService.loginWithSocial(provider);
};