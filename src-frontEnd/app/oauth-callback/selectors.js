import {NAME} from "./constants";

export const getModule = (state) => {
    return state.get(NAME);
};