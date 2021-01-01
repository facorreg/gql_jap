const typeDefs = `
  type Mutation {
    createUser(input: CreateUserInput): UserWithJWT!
  }
`;

export default typeDefs;
