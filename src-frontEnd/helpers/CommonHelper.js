import getEnv from "./common/getEnv";

export const getAppURL = (path = '') => {
    return getEnv('baseUrl') + path;
};