import {HIDE_NOTIFY, SHOW_NOTIFY} from "./actionTypes";

export const showNotify = args => dispatch => {
    const defaultArgs = {
        contact: false,
        contactLink: "",
        title: 'Important',
        content: '',
        button: 'Close',
        upgradePlan: false,
        refresh: false
    };

    const {title, content, button, upgradePlan, contact, contactLink, refresh} = {...defaultArgs, ...args};

    dispatch({
        type: SHOW_NOTIFY,
        data: {
            title,
            content,
            button,
            upgradePlan,
            contact,
            contactLink: contactLink || "//m.me/140068410039355",
            refresh
        }
    });

    return Promise.resolve({title, content, button});
};

export const hideNotify = () => dispatch => {
    dispatch({
        type: HIDE_NOTIFY,
    });

    return Promise.resolve();
};