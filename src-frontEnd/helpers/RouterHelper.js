import queryString from "query-string";
import getHistory from "../store/getHistory"

const cleanObject = (obj) => {
    const newObject = {};

    for (let propName in obj) {
        if (!obj[propName]) {
            continue;
        }

        newObject[propName] = obj[propName];
    }

    return newObject;
};

export const parseSearchQuery = () => {
    const history = getHistory()

    const search = history.location.search;
    return queryString.parse(search);
};

export const changeQuerySearch = () => (query) => {
    const history = getHistory()

    const parsed = parseSearchQuery(history);
    const changed = Object.assign(parsed, query);
    const clean = cleanObject(changed);

    history.replace({
        search: queryString.stringify(clean)
    });
};

export const addQueryToUrl = (originUrl, queries = {}) => {
    const search = queryString.extract(originUrl);
    const parsed = queryString.parse(search);
    const appendParsed = {
        ...parsed,
        ...queries
    };

    return originUrl + '?' + queryString.stringify(appendParsed);
};