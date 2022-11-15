import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from "nexus";

import { User } from "./models/User";
import { Users_Recipes } from "./models/Users_Recipes";
import { Recipe } from "./models/Recipes";

import { DateTimeResolver } from "graphql-scalars";
import { context } from "./db";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

const Query = objectType({
  name: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allUsers", {
      type: "User",
      resolve: (_parent, _args, context) => {
        return context.prisma.user.findMany();
      },
    });

    t.nonNull.list.nonNull.field("allRecipes", {
      type: "Recipe",
      resolve: (_parent, _args, context) => {
        return context.prisma.Recipe.findMany();
      },
    });

    t.nonNull.list.nonNull.field("allUser_Recipes", {
      type: "Users_Recipes",
      resolve: (_parent, _args, context) => {
        return context.prisma.Users_Recipes.findMany();
      },
    });

    t.nullable.field("recipeById", {
      type: "Recipe",
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.Recipe.findUnique({
          where: { id: args.id || undefined },
        });
      },
    });
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.nonNull.field("signupUser", {
      type: "User",
      args: {
        data: nonNull(
          arg({
            type: "UserCreateInput",
          })
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.user.create({
          data: {
            username: args.data.username,
            password: args.data.password,
          },
        });
      },
    }),
      t.field("createRecipe", {
        type: "Recipe",
        args: {
          data: nonNull(
            arg({
              type: "RecipeCreateInput",
            })
          ),
        },
        resolve: (_, args, context) => {
          return context.prisma.Recipe.create({
            data: {
              recipeName: args.data.recipeName,
              recipeCookTime: args.data.recipeCookTime,
              recipeServings: args.data.recipeServings,
              skillLvl: args.data.skillLvl,
            },
          });
        },
      });

    t.field("AddRecipe", {
      type: "Users_Recipes",
      args: {
        data: nonNull(
          arg({
            type: "Users_RecipesInput",
          })
        ),
      },
      resolve: async (_, args, context) => {
        try {
          const recipeHolder = await context.prisma.Users_Recipes.create({
            data: {
              user: {
                connect: {
                  id: args.data.id,
                },
              },
              recipes: {
                connect: {
                  id: args.data.recipesid,
                },
              },
              amount: args.data.amount,
            },
          });

          return recipeHolder;
        } catch (e) {
          throw new Error(e);
        }
      },
    }),
      t.field("deleteRecipe", {
        type: "Recipe",
        args: {
          id: nonNull(intArg()),
        },
        resolve: (_, args, context) => {
          return context.prisma.Recipe.delete({
            where: { id: args.id },
          });
        },
      });
  },
});

const UserUniqueInput = inputObjectType({
  name: "UserUniqueInput",
  definition(t) {
    t.int("id");
    t.string("email");
  },
});

const RecipeCreateInput = inputObjectType({
  name: "RecipeCreateInput",
  definition(t) {
    t.nonNull.string("recipeName");
    t.string("content");
    t.nonNull.int("recipeCookTime");
    t.nonNull.int("recipeServings");
    t.int("skillLvl");
  },
});

const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.nonNull.string("password");
    t.nonNull.string("username");
  },
});

const Users_RecipesInput = inputObjectType({
  name: "Users_RecipesInput",
  definition(t) {
    t.int("id");
    t.int("amount");
    t.nonNull.int("recipesid");
  },
});

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Recipe,
    Users_Recipes,
    User,
    UserUniqueInput,
    UserCreateInput,
    Users_RecipesInput,
    RecipeCreateInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + "/../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  contextType: {
    module: require.resolve("./db"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});
