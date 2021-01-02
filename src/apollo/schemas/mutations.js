const typeDefs = `
  type Mutation {
    createUser(input: CreateUserInput): UserWithJWT!
    connect(input: ConnectUserInput): UserWithJWT!
  }
`;

export default typeDefs;
