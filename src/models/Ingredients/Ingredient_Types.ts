import { inputObjectType } from "nexus";

export const IngredientCreateInput = inputObjectType({
  name: "IngredientCreateInput",
  definition(t) {
    t.nonNull.string("recipeName");
    t.string("content");
    t.nonNull.int("recipeCookTime");
    t.nonNull.int("recipeServings");
    t.int("skillLvl");
  },
});

export const IngredientAddInput = inputObjectType({
  name: "IngredientAddInput",
  definition(t) {
    t.nonNull.int("recipeid");
  },
});

export const Users_IngredientsInput = inputObjectType({
  name: "Users_IngredientsInput",
  definition(t) {
    t.int("id");
    t.int("amount");
    t.nonNull.int("recipesid");
  },
});

export default {
  Users_IngredientsInput,
  IngredientAddInput,
  IngredientCreateInput,
};
