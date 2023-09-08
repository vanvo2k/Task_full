import {SHOW_SERVER_ERROR, TOGGLE_MODAL_SERVER_ERROR} from "./actionTypes";

export const toggleModal = () => dispatch => {
    dispatch({
        type: TOGGLE_MODAL_SERVER_ERROR
    });

    return Promise.resolve();
};

export const showServerError = ({title, message}) => dispatch => {
    dispatch({
        type: SHOW_SERVER_ERROR,
        data: {
            message,
            title
        }
    });

    return Promise.resolve();
};