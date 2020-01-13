const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = graphql;

const UserType = require('./user_type');

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  // There is a circular referencing between the user and the company,
  // therefor the fields object is wrapped in an arrow function that returns an object.
  // this way the user type is inside the closure scope of this function and we don't get errors
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      // the parentValue is an instance of the compnany
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res => res.data)
      }
    }
  })
});

module.exports = CompanyType;