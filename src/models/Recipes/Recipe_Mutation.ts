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
        console.log(context.id);

        const new_recipe = await context.prisma.Users_Recipes.upsert({
          where: {
            recipeIndentifier: {
              userid: context.id,
              recipesid: args.data.recipeid,
            },
          },
          update: {
            userid: context.id,
            recipesid: args.data.recipeid,
          },
          create: {
            userid: context.id,
            recipesid: args.data.recipeid,
          },
        });

        console.log(new_recipe);

        return await context.prisma.user.update({
          where: { id: context.id },
          data: {
            recipes: {
              connect: {
                recipeIndentifier: {
                  userid: context.id,
                  recipesid: args.data.recipeid,
                },
              },
            },
          },
        });
      },
    });
  },
});
