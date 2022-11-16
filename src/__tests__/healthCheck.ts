import { gql } from "@apollo/client/core";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { schema } from "../schema";
import prisma from "../db";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

// it("runs a health against graphql schema", async () => {
//   let result = await server.executeOperation({
//     query: gql`
//       query {
//         test(bool: false)
//       }
//     `,
//   });
//   expect(result).toBeTruthy();
//   expect(result).toHaveProperty("data");
//   expect(result.errors).toBeFalsy();
//   expect(result.data.test).toEqual(false);

//   result = await server.executeOperation({
//     query: gql`
//       query {
//         test(bool: invalidArgument)
//       }
//     `,
//   });
//   expect(result).toBeTruthy();
//   expect(result.errors).toBeTruthy();
// });

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema,
  }),
  context: ({ req }) => {
    return {
      ...req,
      prisma,
    };
  },
});

it("server works", async () => {
  const result = await server.executeOperation({
    query: gql`
      query {
        allUsers {
          id
        }
      }
    `,
  });
  expect(result).toBeTruthy();
  expect(result.errors).toBeUndefined();
});

it("validate user info", async () => {
  const result = await server.executeOperation({
    query: gql`
      mutation {
        login(data: { username: "bob", password: "" }) {
          user {
            id
          }
        }
      }
    `,
  });
  expect(result).toBeTruthy();
  expect(result.errors).toBeTruthy();
});

it("user Signup sucess", async () => {
  const result = await server.executeOperation({
    query: gql`
      mutation {
        signupUser(data: { username: "test_user", password: "testpass" }) {
          user {
            id
            username
          }
        }
      }
    `,
  });
  expect(result).toBeDefined();
  expect(result).toHaveProperty("data");
});

it("user Signup fail", async () => {
  let result = await server.executeOperation({
    query: gql`
      mutation {
        signupUser(data: { username: "test_user", password: "testpass" }) {
          user {
            id
            username
          }
        }
      }
    `,
  });
  console.log(result.data, result.errors);
  result = await server.executeOperation({
    query: gql`
      mutation {
        signupUser(data: { username: "test_user", password: "testpass" }) {
          user {
            id
            username
          }
        }
      }
    `,
  });
  console.log(result.data, result.errors);
  expect(result).toBeDefined();
  expect(result).toHaveProperty("data");
});
