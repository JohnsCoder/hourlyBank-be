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
  }

  type Project {
    id: String!
    title: String!
    dateStart: String!
    dateFinish: String!
    currency: String!
    price: Float!
    description: String!
    finished: Boolean!
    daily: [Daily]
  }

  type Daily {
    hour: Float
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
    CheckHealth: Message!
  }

  type Mutation {
    CreateUser(username: String!, email: String!, password: String!): Message!
    CreateProject(
      title: String!
      dateStart: String!
      dateFinish: String!
      description: String!
      currency: String!
      price: Float!
      userId: String!
    ): Message
    UpdateProject(id: String!, hour: Float!, todo: String!): Message!
    FinishProject(id: String!): Message!
    DeleteProject(id: String!): Message!
    DeleteUser(id: String!): Message!
  }
`;
export default typeDefs;
