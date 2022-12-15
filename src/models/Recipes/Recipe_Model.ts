import { objectType } from "nexus";

export const String = objectType({
  name: "String",
  definition(t) {
    t.string("text-snippet");
  },
});

export const Recipe = objectType({
  name: "Recipe",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("recipeName");
    t.nonNull.int("recipeCookTime");
    t.nonNull.int("recipeServings");
    t.string("instructions");

    t.string("instructionssnippet", {
      resolve(parent, _, context) {
        return parent.instructions.slice(0, 25);
      },
    });

    t.list.field("recipeHolder", {
      type: "Users_Recipes",
      resolve: (parent, _, context) => {
        return context.prisma.Recipe.findUnique({
          where: { id: parent.id || undefined },
        }).recipeHolder();
      },
    });

    t.list.field("ingredients", {
      type: "Recipe_Ing",
      resolve: (parent, _, context) => {
        return context.prisma.Recipe.findUnique({
          where: { id: parent.id || undefined },
        }).ingredients();
      },
    });
  },
});
