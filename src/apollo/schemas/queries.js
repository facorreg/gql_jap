const typeDefs = `
  type Query {
    getKanji(word: String!): Kanji
    getWord(word: String!): [Word]
    getWords(from: Int, limit: Int): Words
  }
`;

export default typeDefs;
