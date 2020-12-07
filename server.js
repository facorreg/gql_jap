import Koa from 'koa';
import connect from 'mongo/connect';
import { ApolloServer } from 'apollo-server-koa';
import { schemas as typeDefs, resolvers } from 'apollo';

const app = new Koa();
const PORT = 4000;

connect('jpDb');

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
