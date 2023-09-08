import getEnv from "../common/getEnv";

export default (path) => {
    return getEnv('filesUrl') + path;
};