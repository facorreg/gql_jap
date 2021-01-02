import Koa from 'koa';
import connect from 'mongo/connect';
import { ApolloServer } from 'apollo-server-koa';
import { schemas as typeDefs, resolvers } from 'apollo';
import { decodeJWT, verifyJWT, getEnv } from 'utils';
import getUser from 'queries/user/getUser';

const app = new Koa();
const PORT = 4000;

connect(getEnv('DB_NAME'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ ctx }) => {
    const rawToken = ctx.request.header.authorization || '';
    const [, token] = rawToken.match(/^Bearer (.+)$/) || [];

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
