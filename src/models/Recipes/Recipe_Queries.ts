import { objectType, extendType, intArg, nonNull, arg } from "nexus";
import { resolve } from "path";
import { Recipe } from "./Recipe_Model";

interface Recipe_Query_Paramters {
  skip?: number;
  take: number;
  cursor?: { id: number };
}

export const Recipe_Query = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("myRecipes", {
      type: "User",
      resolve: async (_parent, _args, context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            id: context.id,
          },
        });

        return await context.prisma.Users_Recipes.findMany({
          where: {
            userid: user.id,
          },
        });
      },
    }),
      t.nonNull.field("allRecipes", {
        type: "Pagination_Recipe",
        args: {
          data: nonNull(
            arg({
              type: "RecipeLimit",
            })
          ),
        },

        resolve: async (_parent, _args, context) => {
          const realLimit = Math.min(50, _args.data.limit) + 1;

          const cursor = parseInt(_args.data.cursor);

          let firstQueryResults: any;

          var query: Recipe_Query_Paramters;

          query = {
            take: realLimit,
          };

          if (cursor) {
            query.skip = 1;
            // TODO Change to Created At
            query.cursor = {
              id: parseInt(_args.data.cursor),
            };
          }

          firstQueryResults = await context.prisma.Recipe.findMany(query);

          const lastRecipeInResults = firstQueryResults[_args.data.limit - 1];

          // try {
          //   const myCursor = lastRecipeInResults.id;
          // } catch (e) {
          //   const myCursor = _args.data.cursor;
          // }

          // More Recipes
          const hasMore = firstQueryResults.length === realLimit ? true : false;

          console.log(firstQueryResults);

          return {
            hasMore: hasMore,
            Recipes: firstQueryResults.slice(0, realLimit - 1),
          };
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
