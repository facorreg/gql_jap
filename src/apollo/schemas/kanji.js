const typeDefs = `
  type Strokes {
    images: [String]
    count: Int
  }

  type Video {
    poster: String
    video: String
  }

  type References {
    grade: Int
    kodansha: String
    classic_nelson: String
    jlpt: Int
  }

  type Kanji {
    character: String!
    meaning: String!
    onyomi: String
    kunyomi: String
    strokes: Strokes
    video: Video
    examples: [String]
    references: References
  }
`;

export default typeDefs;
