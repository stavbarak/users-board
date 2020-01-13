const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = graphql;

const UserType = require('./user_type');
const CompanyType = require('./company_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      // give the root query an id to get back the user
      args: { id: { type: GraphQLString } },
      // the resolve funtion is where we actually go into the database and find what we're looking for.
      // parentValue - only used in nested query types
      // args - gets called with the arguments that were passed into the original query.
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(resp => resp.data);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return axios.get('http://localhost:3000/users/')
        .then(resp => resp.data)
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve() {
        return axios.get('http://localhost:3000/companies/')
        .then(resp => resp.data)
      }
    }
  })
});

module.exports = RootQueryType;