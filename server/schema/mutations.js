const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = graphql;

const UserType = require('./queries/user_type');
const CompanyType = require('./queries/company_type');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      addUser: {
        type: UserType,
        args: {
          firstName: { type: new GraphQLNonNull(GraphQLString) },
          age: { type: GraphQLInt },
          companyId: { type: GraphQLString }
        },
        resolve(parentValue, { firstName, age, companyId }) {
          return axios.post('http://localhost:3000/users', { firstName, age, companyId })
            .then(resp => resp.data);
        }
      },
      deleteUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parentValue, { id }) {
          return axios.delete(`http://localhost:3000/users/${id}`)
            .then(resp => resp.data);
        }
      },
      addCompany: {
          type: CompanyType,
          args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            id: { type: GraphQLString },
            location: { type: GraphQLString }
          },
          resolve(parentValue, { name, id, location }) {
            return axios.post('http://localhost:3000/companies', { name, id, location })
              .then(resp => resp.data);
          }
        },
        deleteCompany: {
          type: CompanyType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLString) }
          },
          resolve(parentValue, { id }) {
            return axios.delete(`http://localhost:3000/companies/${id}`)
              .then(resp => resp.data);
          }
        },
    })
  });

  module.exports = mutation;