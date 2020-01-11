import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { graphql } from 'react-apollo';
import addUser from '../mutations/addUser';
import fetchUsers from '../queries/fetchUsers';

class CreateUser extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: ''
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName } = this.state;
        const { mutate } = this.props;

        mutate({
            variables: {
                firstName,
                lastName
            },
            refetchQueries: [{ query: fetchUsers }]
        }).then(() => browserHistory.push('/'))
    }
    render(){
        const { firstName, lastName } = this.state;
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Add New</h3>
                <form onSubmit={this.onSubmit}>
                    <label>First Name</label>
                    <input value={firstName} onChange={e => this.setState({firstName: e.target.value})} />
                    <label>Last Name</label>
                    <input value={lastName} onChange={e => this.setState({lastName: e.target.value})} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
    
}

export default graphql(addUser)(CreateUser);