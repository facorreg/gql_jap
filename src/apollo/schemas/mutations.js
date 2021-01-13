const typeDefs = `
  type Mutation {
    createUser(input: CreateUserInput): UserWithJWT!
    connect(input: ConnectUserInput): UserWithJWT!
    createDeck(input: CreateDeckInput): Deck!
    deleteDeck(id: String!): Deleted!
    createCard(input: CreateCardInput): Card!
  }
`;

export default typeDefs;
