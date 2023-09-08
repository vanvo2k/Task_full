import queryString from "query-string";
import parseQueryObject from "./parseQueryObject";

export default queries => {
    const {search, filter, sort, analytic} = parseQueryObject(queries);

    const {rank, price, timeAvailable} = filter;

    const objectQueries = {
        term: search.term,
        excludedKeyword: search.excluded,
        searchType: search.type,
        status: filter.status,
        type: filter.type,
        from: rank.from,
        to: rank.to,
        fromP: price.from,
        toP: price.to,
        fromA: timeAvailable.from,
        toA: timeAvailable.to,
        sortByField: sort.field,
        analytic
    };

    return queryString.stringify(objectQueries);
}