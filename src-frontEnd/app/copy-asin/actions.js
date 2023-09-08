import {DISPLAY_ALERT, CLOSE_ALERT} from "./actionTypes";

export const displayAlert = () => dispatch => {
    dispatch({
        type: DISPLAY_ALERT
    });

    return Promise.resolve(true)
}

export const closeAlert = () => dispatch => {
    dispatch({
        type: CLOSE_ALERT
    });

    return Promise.resolve(true);
}
