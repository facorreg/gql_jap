const typeDefs = `
  type User {
    id: String!
    username: String!
    password: String!
    email: String!
  }

  type UserWithJWT {
    jwt: String
    user: User
    error: String
  }
`;

export default typeDefs;
