const typeDefs = `
  type Mutation {
    createUser(input: CreateUserInput): UserWithJWT!
    connect(input: ConnectUserInput): UserWithJWT!
    createDeck(input: CreateDeckInput): Deck!
    deleteDeck(id: String!): Deleted!
  }
`;

export default typeDefs;
