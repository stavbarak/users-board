const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      age: { type: GraphQLInt },
      position: { type: GraphQLString },
      company: {
        type: require('./company_type'),
        resolve(parentValue, args) {
          return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
            .then(res => res.data);
        }
      }
    })
  });

  module.exports = UserType;