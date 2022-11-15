import { objectType } from "nexus";

export const Recipe = objectType({
  name: "Recipe",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("recipeName");
    t.nonNull.int("recipeCookTime");
    t.nonNull.int("recipeServings");
    t.list.field("recipeHolder", {
      type: "Users_Recipes",
      resolve: (parent, _, context) => {
        return context.prisma.Recipe.findUnique({
          where: { id: parent.id || undefined },
        }).Users_Recipes();
      },
    });
  },
});
