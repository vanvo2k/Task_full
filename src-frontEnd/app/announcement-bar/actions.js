import {FETCH_ANNOUNCEMENT_BAR_REQUEST, FETCH_ANNOUNCEMENT_BAR_SUCCESS, MARK_READ} from "./actionTypes";
import {_getAnnouncement, _markRead} from "../../services/AnnouncementServices";

export const fetchAnnouncementBarAvailable = () => {
    return {
        promise: _getAnnouncement(),
        types: [FETCH_ANNOUNCEMENT_BAR_REQUEST, FETCH_ANNOUNCEMENT_BAR_SUCCESS],
    };
};

export const markRead = ({announcementId}) => dispatch => {
    return _markRead({announcementId})
        .then(result => {
            dispatch({
                type: MARK_READ,
                result
            })

            return Promise.resolve(result)
        })
}