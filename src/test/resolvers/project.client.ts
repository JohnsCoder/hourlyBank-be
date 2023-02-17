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
          $price: Int!
          $description: String!
          $finished: Boolean!
        ) {
          CreateProject(
            userId: $userId
            title: $title
            dateStart: $dateStart
            dateFinish: $dateFinish
            description: $description
            price: $price
            finished: $finished
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

  UpdateProject({ id, hour, todo, day }: Daily) {
    return this.serverTest.executeOperation({
      query: gql`
        mutation UpdateProject(
          $id: String!
          $day: Int!
          $hour: String!
          $todo: String!
        ) {
          UpdateProject(id: $id, day: $day, hour: $hour, todo: $todo) {
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
        day: day,
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
