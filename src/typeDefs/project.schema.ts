import { gql } from "apollo-server";

export default gql`
  type Response {
    message: String
    data: String
  }

  type Query {
    GetProjects: Response!
  }

  type Mutation {
    CreateProject(
      title: String!
      price: Float!
      currency: String!
      description: String!
    ): Response!
    UpdateProject(
      id: String
      title: String
      price: Float
      currency: String
      description: String
    ): Response!
    CloseProject(id: String!): Response!
    DeleteProject(id: String!): Response!
  }
`;
