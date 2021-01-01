const typeDefs = `
  type WordsWithTotal {
    total: Int!
    words: [Word]
  }

  type Words {
    wordList: WordsWithTotal   
    countDb: Int!
  }
`;

export default typeDefs;
