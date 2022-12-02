import { objectType, extendType } from "nexus";
import { nonNull, arg } from "nexus";
import { getUserId } from "../../modules/utils";

export const Recipe_Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createRecipe", {
      type: "Recipe",
      args: {
        data: nonNull(
          arg({
            //FIELDS: (recipeName / content / recipeCookTime / recipeServings / skillLvl)
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
    t.field("addRecipeToUser", {
      type: "Recipe",
      args: {
        data: nonNull(
          arg({
            type: "RecipeAddInput",
          })
        ),
      },
      resolve: async (_, args, context) => {
        // Update or Insert User Recipes
        // Only go through if all transactions work
        await context.prisma.$transaction(
          [
            context.prisma.Users_Recipes.upsert({
              where: {
                recipeIndentifier: {
                  userid: context.userId,
                  recipesid: args.data.recipeid,
                },
              },
              update: {
                userid: context.userId,
                recipesid: args.data.recipeid,
              },
              create: {
                userid: context.userId,
                recipesid: args.data.recipeid,
              },
            }),

            context.prisma.user.update({
              where: { id: context.userId },
              data: {
                recipes: {
                  connect: {
                    recipeIndentifier: {
                      userid: context.userId,
                      recipesid: args.data.recipeid,
                    },
                  },
                },
              },
            }),
          ],
          {} // isolation Level
        );
      },
    });
  },
});
