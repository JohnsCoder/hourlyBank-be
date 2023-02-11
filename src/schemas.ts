import { gql } from "apollo-server";

const typeDefs = gql`
  type message {
    message: String
    payload: tokenid
    status: String
    code: Int
  }

  type tokenid {
    tokenid: String
  }

  type User {
    username: String
    email: String!
    password: String!
  }

  type Query {
    GetUser(email: String, password: String): message
  }

  type Mutation {
    UserCreate(username: String, email: String, password: String): message
  }
`;
export default typeDefs;
