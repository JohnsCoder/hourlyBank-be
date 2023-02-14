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
    Auth(token: String): message
    GetProject: message
  }
  type Project {
    userId: Int
    title: String
    dateStart: String
    dateFinish: String
    description: String
    hourStart: String
    hourFinish: Int
    hour: String
    finished: Boolean
  }

  type Daily {
    day: Int
    hour: String
    todo: String
  }

  type Mutation {
    CreateUser(username: String, email: String!, password: String!): message
    CreateProject(
      id: String
      title: String
      dateStart: String
      dateFinish: String
      description: String
      hour: String
      price: Int
      finished: Boolean
      userId: String
    ): message
    UpdateProject(day: Int, hour: String, todo: String): message
    DeleteProject(id: String): message
  }
`;
export default typeDefs;
