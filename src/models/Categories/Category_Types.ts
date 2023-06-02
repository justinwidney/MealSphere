import { inputObjectType } from "nexus";

export const CategoryCreateInput = inputObjectType({
  name: "CategoryCreateInput",
  definition(t) {
    t.nonNull.string("recipeName");
    t.string("content");
    t.nonNull.int("recipeCookTime");
    t.nonNull.int("recipeServings");
    t.int("skillLvl");
  },
});

export const CategoryAddInput = inputObjectType({
  name: "CategoryAddInput",
  definition(t) {
    t.nonNull.int("recipeid");
  },
});

export const Users_CategorysInput = inputObjectType({
  name: "Users_CategorysInput",
  definition(t) {
    t.int("id");
    t.int("amount");
    t.nonNull.int("recipesid");
  },
});

export default {
  Users_CategorysInput,
  CategoryAddInput,
  CategoryCreateInput,
};
