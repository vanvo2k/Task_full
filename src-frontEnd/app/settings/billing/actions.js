import {
    CANCEL_CURRENT_MEMBERSHIP_FAILURE,
    CANCEL_CURRENT_MEMBERSHIP_REQUEST, CANCEL_CURRENT_MEMBERSHIP_SUCCESS,
    FETCH_USER_BILL_HISTORY_FAILURE, FETCH_USER_BILL_HISTORY_REQUEST,
    FETCH_USER_BILL_HISTORY_SUCCESS, FETCH_USER_MEMBERSHIP_FAILURE, FETCH_USER_MEMBERSHIP_REQUEST,
    FETCH_USER_MEMBERSHIP_SUCCESS
} from "./actionTypes";
import {getBillHistory} from "../../../services/payments/BillServices";
import {_cancelMembership, _getCurrentMembership} from "../../../services/payments/MembershipServices";

export const fetchBillHistory = () => {
    return {
        types: [FETCH_USER_BILL_HISTORY_REQUEST, FETCH_USER_BILL_HISTORY_SUCCESS, FETCH_USER_BILL_HISTORY_FAILURE],
        promise: getBillHistory(),
        enableLoadingBar: true
    };
};

export const fetchCurrentMembership = () => {
    return {
        types: [FETCH_USER_MEMBERSHIP_REQUEST, FETCH_USER_MEMBERSHIP_SUCCESS, FETCH_USER_MEMBERSHIP_FAILURE],
        promise: _getCurrentMembership(),
        enableLoadingBar: true
    };
};

export const cancelCurrentMembership = () => {
    return {
        types: [CANCEL_CURRENT_MEMBERSHIP_REQUEST, CANCEL_CURRENT_MEMBERSHIP_SUCCESS, CANCEL_CURRENT_MEMBERSHIP_FAILURE],
        promise: _cancelMembership(),
    };
};