import { gql } from "apollo-server";

const typeDefs = gql`
  type Payload {
    id: String
    tokenid: String
  }

  type Message {
    message: String!
    payload: Payload
    status: String!
    code: Int!
  }

  type Project {
    id: String!
    title: String!
    dateStart: String!
    dateFinish: String!
    price: Int!
    description: String!
    finished: Boolean!
    daily: [Daily]
  }

  type Daily {
    hour: String
    todo: String
    day: Int
  }

  type Projects {
    projects: [Project]
  }

  union ReturnProjects = Projects | Message

  type Query {
    GetUser(email: String!, password: String!): Message!
    Auth(token: String!): Message!
    GetProjects(userId: String!): ReturnProjects
  }

  type Mutation {
    CreateUser(username: String!, email: String!, password: String!): Message!
    CreateProject(
      title: String!
      dateStart: String!
      dateFinish: String!
      description: String!
      price: Int!
      finished: Boolean!
      userId: String!
    ): Message
    UpdateProject(
      id: String!
      day: Int!
      hour: String!
      todo: String!
    ): Message!
    DeleteProject(id: String!): Message!
    DeleteUser(id: String!): Message!
  }
`;
export default typeDefs;
