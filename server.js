import Koa from 'koa';
import connect from 'mongo/connect';
import { ApolloServer } from 'apollo-server-koa';
import { schemas as typeDefs, resolvers } from 'apollo';
import { decodeJWT, verifyJWT } from 'utils';
import getUser from 'queries/user/getUser';

const app = new Koa();
const PORT = 4000;

connect('jpDb');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ ctx }) => {
    const token = ctx.request.header.authorization;
    if (!token) return Promise.resolve({});

    try {
      await verifyJWT(token);
      const { id } = decodeJWT(token);
      const { user } = await getUser(id);

      return Promise.resolve({ user });
    } catch (err) {
      return Promise.resolve({});
    }
  },
});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
