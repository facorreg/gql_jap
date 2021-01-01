const typeDefs = `
  type ExAudio {
    audio: String
    format: String
  }

  type Example {
    type: String
    word: String
    furigana: String
    meaning: String
    audio: ExAudio
  }
`;

export default typeDefs;
