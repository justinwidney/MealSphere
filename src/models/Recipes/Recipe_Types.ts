import { inputObjectType } from "nexus";

export const RecipeCreateInput = inputObjectType({
  name: "RecipeCreateInput",
  definition(t) {
    t.nonNull.string("recipeName");
    t.string("instructions");
    t.nonNull.int("recipeCookTime");
    t.nonNull.int("recipeServings");
    t.int("skillLvl");
  },
});

export const RecipeAddInput = inputObjectType({
  name: "RecipeAddInput",
  definition(t) {
    t.nonNull.int("recipeid");
  },
});

export const RecipeLimit = inputObjectType({
  name: "RecipeLimit",
  definition(t) {
    t.nonNull.int("limit"), t.string("cursor");
  },
});

export const Users_RecipesInput = inputObjectType({
  name: "Users_RecipesInput",
  definition(t) {
    t.int("id");
    t.int("amount");
    t.nonNull.int("recipesid");
  },
});

export default { Users_RecipesInput, RecipeAddInput, RecipeCreateInput };
