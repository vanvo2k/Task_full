import {FETCH_USER_PROFILE_FAILURE, FETCH_USER_PROFILE_REQUEST, FETCH_USER_PROFILE_SUCCESS} from "./actionTypes";
import {_getProfile} from "../../../services/UserService";

export const fetchProfile = () => {
    return {
        types: [FETCH_USER_PROFILE_REQUEST, FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAILURE],
        promise: _getProfile()
    }
};