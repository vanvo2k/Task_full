import {
    OPEN_EVENT_DETAIL,
    CLOSE_EVENT_DETAIL
} from "./actionTypes";

export const actionOpenEventDetail = (event) => dispatch => {
    dispatch({
        type: OPEN_EVENT_DETAIL,
        event
    });

    return Promise.resolve(event);
};

export const actionCloseEventDetail = () => dispatch => {
    dispatch({
        type: CLOSE_EVENT_DETAIL
    });

    return Promise.resolve(true);
};


