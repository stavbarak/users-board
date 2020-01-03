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
      args: { id: { type: GraphQLString } },
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