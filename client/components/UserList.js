import React from 'react';
import { Link } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import fetchUsers from '../queries/fetchUsers';

const UserList = () => {

    const { data, loading } = useQuery(fetchUsers);
    const renderUsers = () => {
        const { users } = data;
        return users.map(user => {
            return (
                <li className="collection-item" key={user.id}>
                    {`${user.firstName} ${user.lastName}`}
                </li>
            )
        })
    }

    if (loading) return <div>Loading</div>
        return (
            <div>
                <ul className="collection">{renderUsers()}</ul>
                <Link className="btn-floating btn-large blue right" to="/users/new">
                    <i className="material-icons">add</i>
                </Link>
            </div>  
        )
}

export default UserList;