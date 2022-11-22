import { objectType, extendType } from "nexus";
import { nonNull, arg } from "nexus";
import { getUserId } from "../../modules/utils";

export const Ingredient_Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createIngredient", {
      type: "Ingredient",
      args: {
        data: nonNull(
          arg({
            type: "IngredientCreateInput",
          })
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.Ingredient.create({
          data: {
            recipeName: args.data.recipeName,
            recipeCookTime: args.data.recipeCookTime,
            recipeServings: args.data.recipeServings,
            skillLvl: args.data.skillLvl,
          },
        });
      },
    });
    t.field("addIngredientToRecipe", {
      type: "Ingredient",
      args: {
        data: nonNull(
          arg({
            type: "IngredientAddInput",
          })
        ),
      },
      resolve: async (_, args, context) => {
        console.log(context.id);

        const new_recipe = await context.prisma.Users_Ingredients.upsert({
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
