import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import UserList from './components/UserList';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  })
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <UserList />
        </ApolloProvider>
    );
  };

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
