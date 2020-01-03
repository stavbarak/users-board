const graphql = require('graphql');
const RootQuery = require('./queries/root_query_type');
const mutation = require('./mutations');
const {
  GraphQLSchema,
} = graphql;

module.exports = new GraphQLSchema({
  mutation,
  query: RootQuery
});