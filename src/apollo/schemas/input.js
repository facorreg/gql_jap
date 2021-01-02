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
`;

export default typeDefs;
