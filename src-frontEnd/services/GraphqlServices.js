import {ApolloClient} from 'apollo-client'
import {setContext} from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import getEnv from "../helpers/common/getEnv"
import AuthServices from "./AuthServices"

const httpLink = createHttpLink({
    uri: getEnv('graphql'),
})

const authLink = setContext((_, {headers}) => {
    const token = AuthServices.getAccessToken()

    return {
        headers: {
            ...headers,
            authorization: token ? token : null,
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export const query = client.query

export const makeQuery = ({query, variables}) => client.query({query, variables, fetchPolicy: 'network-only'})

export const makeMutation = ({mutation, variables}) => client.mutate({mutation, variables})
