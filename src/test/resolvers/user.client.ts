import { ApolloServer, gql } from "apollo-server-express";
import resolvers from "../../resolvers/daily.resolver";
import typeDefs from "../../typeDefs/daily.schema";
import { User } from "../../entities/User";

export default class UserClient {
  private testServer = new ApolloServer({
    resolvers,
    typeDefs,
  });

  CreateUser({ username, password, email }: User) {
    return this.testServer.executeOperation({
      query: gql`
        mutation CreateUser(
          $username: String!
          $email: String!
          $password: String!
        ) {
          CreateUser(username: $username, email: $email, password: $password) {
            message
            status
            code
          }
        }
      `,
      variables: {
        username: username,
        password: password,
        email: email,
      },
    });
  }

  GetUser({ email, password }: User) {
    return this.testServer.executeOperation({
      query: gql`
        query GetUser($email: String!, $password: String!) {
          GetUser(email: $email, password: $password) {
            payload {
              tokenid
            }
            message
            status
            code
          }
        }
      `,
      variables: {
        email: email,
        password: password,
      },
    });
  }

  Authorize(token: String) {
    return this.testServer.executeOperation({
      query: gql`
        query Auth($token: String!) {
          Auth(token: $token) {
            message
            payload {
              id
            }
            code
            status
          }
        }
      `,
      variables: {
        token: token,
      },
    });
  }

  DeleteUser({ id }: User) {
    return this.testServer.executeOperation({
      query: gql`
        mutation DeleteUser($id: String!) {
          DeleteUser(id: $id) {
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
}
