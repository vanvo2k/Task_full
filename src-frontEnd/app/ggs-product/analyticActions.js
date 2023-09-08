import {GGS_CHANGE_QUERY} from "./actionTypes";


export const changeQuery = (query) => dispatch => {
    const defaultArgs = {
        search: {},
        filter: {},
        sort: {}
    };

    const {search, filter, sort} = {
        ...defaultArgs,
        ...query
    };

    dispatch({
        type: GGS_CHANGE_QUERY,
        data: {
            search,
            filter,
            sort
        }
    });

    return Promise.resolve(query);
};