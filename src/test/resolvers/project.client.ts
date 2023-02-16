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
          $title: String
          $dateStart: String
          $dateFinish: String
          $price: Int
          $description: String
          $finished: Boolean
        ) {
          CreateProject(
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
        title: project.title,
        dateStart: project.dateStart,
        dateFinish: project.dateFinish,
        description: project.description,
        price: project.price,
        finished: project.finished,
      },
    });
  }

  GetProject() {
    return this.serverTest.executeOperation({
      query: gql`
        query GetProject {
          GetProject {
            message
            code
            status
          }
        }
      `,
    });
  }

  UpdateProject({ hour, todo, day }: Daily) {
    return this.serverTest.executeOperation({
      query: gql`
        mutation UpdateProject($day: Int, $hour: String, $todo: String) {
          UpdateProject(day: $day, hour: $hour, todo: $todo) {
            message
            code
            status
          }
        }
      `,
      variables: {
        hour: hour,
        todo: todo,
        day: day,
      },
    });
  }

  DeleteProject({ id }: Project) {
    return this.serverTest.executeOperation({
      query: gql`
        mutation DeleteProject($projectId: String) {
          DeleteProject(id: $projectId) {
            code
            message
            status
          }
        }
      `,
      variables: {
        projectId: id,
      },
    });
  }
}
