import {
    FETCH_LIST_MY_ANALYTICS_FAILURE, FETCH_LIST_MY_ANALYTICS_REQUEST,
    FETCH_LIST_MY_ANALYTICS_SUCCESS, FETCH_REMOVE_MY_ANALYTIC_FAILURE, FETCH_REMOVE_MY_ANALYTIC_REQUEST,
    FETCH_REMOVE_MY_ANALYTIC_SUCCESS
} from "./actionTypes";
import {makeMutation, makeQuery} from "../../services/GraphqlServices";
import gql from "graphql-tag";

const queryListAnalytics = gql`
{
  myAnalytics {
    total
    limit
    page
    pages
    docs {
      _id
      title
      args
    }
  }
}
`;

export const fetchListMyAnalytics = () => {
    return {
        types: [FETCH_LIST_MY_ANALYTICS_REQUEST, FETCH_LIST_MY_ANALYTICS_SUCCESS, FETCH_LIST_MY_ANALYTICS_FAILURE],
        promise: makeQuery({
            query: queryListAnalytics
        })
    }
};

const removeAnalytics = gql`
mutation Mutation($id: ID!) {
  deleteMyAnalytic(id: $id)
}
`;

export const fetchRemoveMyAnalytic = (id) => {
    return {
        types: [FETCH_REMOVE_MY_ANALYTIC_REQUEST, FETCH_REMOVE_MY_ANALYTIC_SUCCESS, FETCH_REMOVE_MY_ANALYTIC_FAILURE],
        promise: makeMutation({
            mutation: removeAnalytics, variables: {id}
        }),
        id
    }
};