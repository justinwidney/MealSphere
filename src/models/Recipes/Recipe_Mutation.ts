import { objectType, extendType } from "nexus";
import { nonNull, arg } from "nexus";

const Mutation = extendType({
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
            type: "RecipeCreateInput",
          })
        ),
      },
      resolve: (_, args, context) => {
        const new_recipe = context.prisma.Users_Recipes.create({
          data: {
            userid: context.user,
            recipeid: args.data.id,
          },
        });

        return context.prisma.user.update({
          where: { id: context.id },
          data: {
            recipes: {
              push: new_recipe.id,
            },
          },
        });
      },
    });
  },
});
