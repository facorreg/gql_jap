import { createUser } from './user';

const resolvers = {
  Mutation: {
    createUser: (_, args) => createUser(args.input),
  },
};

export default resolvers;
