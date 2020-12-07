const typeDefs = `
  type Query {
    getKanji(word: String!): Kanji
    getWord(word: String!): [Word]
  }
`;

export default typeDefs;
