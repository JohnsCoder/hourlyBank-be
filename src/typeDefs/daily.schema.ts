import { gql } from "apollo-server";

export default gql`
  type Response {
    message: String
    data: String
  }

  type Query {
    GetDailies(projectId: String!): Response!
  }

  type Mutation {
    CreateDaily(
      hours: Int!
      description: String!
      projectId: String!
    ): Response!
    UpdateDaily(id: String!): Response!
    DeleteDaily(id: String!): Response!
  }
`;
