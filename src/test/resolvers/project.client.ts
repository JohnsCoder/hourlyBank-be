import { ApolloServer, gql } from "apollo-server-express";
import resolvers from "../../resolvers";
import typeDefs from "../../schemas";
import { Daily, Project } from "../../types/arguments";

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
          $dateStart: String!
          $dateFinish: String!
          $currency: String!
          $price: Float!
          $description: String!
        ) {
          CreateProject(
            userId: $userId
            title: $title
            dateStart: $dateStart
            dateFinish: $dateFinish
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
        dateStart: project.dateStart,
        dateFinish: project.dateFinish,
        description: project.description,
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

  UpdateProject({ id, hour, todo }: Daily) {
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
        hour: hour,
        todo: todo,
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
