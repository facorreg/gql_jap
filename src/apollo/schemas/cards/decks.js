const typeDefs = `
  type Deck {
    id: String!
    name: String!
    type: String!
    userId: String!
    cardIds: [String]!
  }
`;

export default typeDefs;
