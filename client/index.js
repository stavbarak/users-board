import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './components/App';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

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
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                  <IndexRoute component={UserList} />
                  <Route path="users/new" component={CreateUser} />
                </Route>
            </Router>
        </ApolloProvider>
    );
  };

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
