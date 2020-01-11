import gql from 'graphql-tag';

export default gql`
mutation AddUser($firstName: String!, $lastName: String!){
  addUser(firstName: $firstName, lastName: $lastName){
    id
    firstName
    lastName
  }
}
`;