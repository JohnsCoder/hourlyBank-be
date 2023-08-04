import { gql } from "apollo-server";

export default gql`
  type Response {
    message: String
    data: String
  }
  type Query {
    GetUser(email: String!, password: String!): Response!
    Auth: Response!
  }

  type Mutation {
    CreateUser(username: String!, email: String!, password: String!): Response!
  }
`;
