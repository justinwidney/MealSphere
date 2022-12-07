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
  fieldAuthorizePlugin,
} from "nexus";

//import { User, User_Mutation, User_Query } from "./models/Users/User";
import * as User from "./models/Users";
import { Users_Recipes } from "./models/Users_Recipes";
import * as Recipe from "./models/Recipes";
import * as Ingredient from "./models/Ingredients";

import { DateTimeResolver } from "graphql-scalars";
import { Recipe_Ing } from "./models/Recipe_Ing";
import { type } from "os";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

const Query = objectType({
  name: "Query",
  definition(t) {
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

const FieldError = objectType({
  name: "FieldError",
  definition(t) {
    t.string("field");
    t.string("message");
  },
});

const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.field("user", {
      type: "User",
    });
    t.string("token");
    t.field("Errors", {
      type: "FieldError",
    });
  },
});

const ForgotPasswordInput = inputObjectType({
  name: "ForgotPasswordInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("username");
  },
});

const ChangePasswordInput = inputObjectType({
  name: "ChangePasswordInput",
  definition(t) {
    t.nonNull.string("password");
    t.nonNull.string("token");
  },
});

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Recipe,
    Users_Recipes,
    User,
    FieldError,
    AuthPayload,
    Recipe_Ing,
    Ingredient,
    ForgotPasswordInput,
    ChangePasswordInput,
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
  plugins: [fieldAuthorizePlugin()],
});
