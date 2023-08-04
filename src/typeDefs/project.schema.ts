import { gql } from "apollo-server";

export default gql`
  type Response {
    message: String
    data: String
  }

  type Query {
    GetProjects(userId: String!): Response!
  }

  input Project {
    id: String!
    title: String!
    dateStart: String!
    dateFinish: String!
    description: String!
    currency: String!
    price: Float!
    finished: Boolean!
    userId: String!
    daily: String!
  }

  type Mutation {
    CreateProject(project: Project): Response!
    CloseProject(id: String!, finished: Boolean!): Response!
    DeleteProject(id: String!): Response!
  }
`;
