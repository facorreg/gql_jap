const typeDefs = `
  type Japanese {
    word: String
    reading: String
  }

  type Word {
    japanese: [Japanese]
    tags: String
    partsOfSpeech: String
    definitions: [String]
  }
`;

export default typeDefs;
