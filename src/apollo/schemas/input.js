const typeDefs = `
  input CreateUserInput {
    username: String!
    password: String!
    email: String!
  }

  input ConnectUserInput {
    identifier: String!
    password: String!
  }

  input CreateDeckInput { 
    name: String!
    type: String!
  }

  input CreateCardInput {
    deckId: String!
    value: String!
    type: String
    repeat: String
  }
`;

export default typeDefs;
