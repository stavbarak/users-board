import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import UserList from './components/UserList';

const client = new ApolloClient({});

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
