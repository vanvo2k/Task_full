import merge from "lodash/merge";

export default queries => {
    const defaultArgs = {
        search: {
            type: "",
            term: "",
            exclude: ""
        },
        filter: {
            status: "",
            type: "",
            rank: {
                from: null,
                to: null,
            },
            timeAvailable: {
                from: null,
                to: null,
            },
            price: {
                from: null,
                to: null
            }
        },
        sort: {
            field: "",
            order: ""
        }
    };

    return merge(defaultArgs, queries);
};