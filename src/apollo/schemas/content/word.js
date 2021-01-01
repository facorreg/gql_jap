const typeDefs = `
  type Japanese {
    word: String
    reading: String
  }

  type Sense {
    tags: String
    partsOfSpeech: String
    definitions: String
    examples: [String]
  }

  type Word {
    japanese: [Japanese]
    senses: [Sense]
    kanjiIds: [String]
  }
`;

export default typeDefs;
