const typeDefs = `
  type Query {
    getKanji(word: String!): Kanji
    getKanjiList(ids: [String]): [Kanji]
    getWord(word: String!): [Word]
    getWords(from: Int, limit: Int): Words
    getExamples(ids: [String]!): [Example]
    me: String
  }
`;

export default typeDefs;
