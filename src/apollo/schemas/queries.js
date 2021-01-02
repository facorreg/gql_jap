const typeDefs = `
  type Query {
    getKanji(word: String!): Kanji
    getKanjiList(ids: [String]): [Kanji]
    getWord(word: String!): [Word]
    getWords(from: Int, limit: Int): Words
    getExamples(ids: [String]!): [Example]
    getUser(id: String!): User
    me: User
  }
`;

export default typeDefs;
