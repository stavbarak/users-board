import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import fetchUsers from '../queries/fetchUsers';

const UserList = () => {

    const { data, loading } = useQuery(fetchUsers);
    const renderUsers = () => {
        const { users } = data;
        return users.map(user => {
            return (
                <li key={user.id}>
                    {user.firstName}
                </li>
            )
        })
    }

    if (loading) return <div>Loading</div>
        return (
            <ul>{renderUsers()}</ul>
        )
}

export default UserList;