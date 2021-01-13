import { createUser, connect } from './user';
import { createDeck, deleteDeck, createCard } from './cards';

const resolvers = {
  Mutation: {
    createUser: (_, args) => createUser(args.input),
    connect: (_, args) => connect(args.input),
    createDeck: (_, args, ctx) => createDeck(args.input, ctx),
    deleteDeck: (_, args, ctx) => deleteDeck(args.id, ctx),
    createCard: (_, args, ctx) => createCard(args.input, ctx),
  },
};

export default resolvers;
