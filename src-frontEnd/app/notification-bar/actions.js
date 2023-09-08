import {_getNotificationBar} from "../../services/NotificationServices";
import {FETCH_NOTIFICATION_BAR_REQUEST, FETCH_NOTIFICATION_BAR_SUCCESS} from "./actionTypes";
import {FETCH_COUPON_AVAILABLE_FAILURE} from "../checkout/actionTypes";
import setCookie from "../../helpers/cookie/setCookie";

export const fetchNotificationBarAvailable = () => {
    return {
        promise: _getNotificationBar(),
        types: [FETCH_NOTIFICATION_BAR_REQUEST, FETCH_NOTIFICATION_BAR_SUCCESS, FETCH_COUPON_AVAILABLE_FAILURE],
    };
};

export const hideNotificationBar = () => dispatch => {
    setCookie('hideNotificationBar', true, 3);

    return Promise.resolve(true);
};