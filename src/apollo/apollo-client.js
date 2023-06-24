import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink, concat } from '@apollo/client';
// import { RestLink } from 'apollo-link-rest';
import { onError } from '@apollo/client/link/error';
import { toast } from "react-toastify";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map( ({ message, extensions }) => {
      if(message === "validation") {
        Object.values(extensions.validation).flat().map( errMessage => toast.error(errMessage) )
      }else {
        toast.error(String(message.split('@')[0]))
      }
    })
  }
  if (networkError) {
    toast.error("خطای شبکه دوباره امتحان کنید");
  }
});


// const restLink = new RestLink({ uri: '' });
const auth = new HttpLink({
  uri: 'https://admin.hy2.ir/graphql/auth'
});

const guess = new HttpLink({
  uri: 'https://admin.hy2.ir/graphql'
});

const graphqlEndpoints = ApolloLink.split(
  (operation) => operation.getContext().serviceName === 'auth',
  auth,
  guess
);

const defaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }

const link = ApolloLink.from([errorLink, graphqlEndpoints]);
const cache = new InMemoryCache({
  resultCaching: false,
});

const client = new ApolloClient({
  link,
  cache,
  defaultOptions: defaultOptions,
  // ssrMode: typeof window === 'undefined',
  // credentials: 'include',
});

export default client;
