import React, { Component, useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class UserList extends Component {

    renderUsers() {
        const { data } = this.props;
        const { users } = data;
        return users.map(user => {
            return (
                <li key={user.id}>
                    {user.firstMame}
                </li>
            )
        })

    }
    render() {
        const { data } = this.props;
        const { loading } = data;
        if (loading) return <div>Loading</div>
        return (
            <ul>{this.renderUsers()}</ul>
        )
    }
}

const query = gql`
{
    users {
      id
      firstName
    }
  }
`;


export default graphql(query, {
    options: { fetchPolicy: 'no-cache', returnPartialData: true },
  })(UserList);

//export default graphql(query)(UserList);