import { createUser, connect } from './user';

const resolvers = {
  Mutation: {
    createUser: (_, args) => createUser(args.input),
    connect: (_, args) => connect(args.input),
  },
};

export default resolvers;
