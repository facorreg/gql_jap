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
`;

export default typeDefs;
