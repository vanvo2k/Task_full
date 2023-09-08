import {createReducer} from "redux-create-reducer";

const themeState = {
    heightNavbar: '70px',
    primaryColor: "#03A9F4",
    textColor: "#37474F",
    success: '#4CAF50',
    danger: '#F44336'
};

export default createReducer({...themeState}, {});

export const getState = (state) => state.get('theme');
