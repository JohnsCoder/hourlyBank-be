import { ApolloServer, gql } from "apollo-server-express";
import resolvers from "../../resolvers/project.resolver";
import typeDefs from "../../typeDefs/project.schema";
import { Project } from "../../entities/Project";
import { Daily } from "../../entities/Daily";

export default class ProjectClient {
  private serverTest = new ApolloServer({
    resolvers,
    typeDefs,
  });

  CreateProject(project: Project) {
    return this.serverTest.executeOperation({
      query: gql`
        mutation CreateProject(
          $userId: String!
          $title: String!
          $createdAt: String!
          $currency: String!
          $price: Float!
          $description: String!
        ) {
          CreateProject(
            userId: $userId
            title: $title
            createdAt: $createdAt
            description: $description
            currency: $currency
            price: $price
          ) {
            message
            code
            status
          }
        }
      `,
      variables: {
        userId: project.userId,
        title: project.title,
        description: project.description,
        createdAt: project.createdAt,
        price: project.price,
        currency: project.currency,
        finished: project.finished,
      },
    });
  }

  GetProjects({ userId }: Project) {
    return this.serverTest.executeOperation({
      query: gql`
        query GetProjects($userId: String!) {
          GetProjects(userId: $userId) {
            __typename
            ... on Projects {
              projects {
                id
                title
                dateStart
                dateFinish
                description
                price
                finished
                daily {
                  hour
                  day
                  todo
                }
              }
            }
            ... on Message {
              message
              code
              status
            }
          }
        }
      `,
      variables: {
        userId: userId,
      },
    });
  }

  UpdateProject({ id, hours, description }: Daily) {
    return this.serverTest.executeOperation({
      query: gql`
        mutation UpdateProject($id: String!, $hour: Float!, $todo: String!) {
          UpdateProject(id: $id, hour: $hour, todo: $todo) {
            message
            code
            status
          }
        }
      `,
      variables: {
        id: id,
        hour: hours,
        todo: description,
      },
    });
  }

  FinishProject({ id }: { id: string }) {
    return this.serverTest.executeOperation({
      query: gql`
        mutation FinishProject($id: String!) {
          FinishProject(id: $id) {
            message
            code
            status
          }
        }
      `,
      variables: {
        id: id,
      },
    });
  }

  DeleteProject({ id }: Project) {
    return this.serverTest.executeOperation({
      query: gql`
        mutation DeleteProject($id: String!) {
          DeleteProject(id: $id) {
            code
            message
            status
          }
        }
      `,
      variables: {
        id: id,
      },
    });
  }
}
