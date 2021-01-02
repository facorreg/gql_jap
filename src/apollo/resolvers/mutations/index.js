import { createUser, connect } from './user';
import { createDeck } from './cards';

const resolvers = {
  Mutation: {
    createUser: (_, args) => createUser(args.input),
    connect: (_, args) => connect(args.input),
    createDeck: (_, args, ctx) => createDeck(args.input, ctx),
  },
};

export default resolvers;
