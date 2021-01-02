const typeDefs = `
  type Deck {
    name: String!
    type: String!
    userId: String!
    cardIds: [String]!
  }
`;

export default typeDefs;
