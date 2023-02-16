import { describe, it } from "node:test";
import UserClient from "./resolvers/user.client";

const successfulMessages = {
     200: {
          
     }
}

describe("user routes", () => {
     it("register route", () => {
          const createUser = new UserClient().CreateUser("")
     })
})