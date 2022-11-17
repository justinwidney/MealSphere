import { objectType, extendType } from "nexus";

export const Recipe_Ing = objectType({
  name: "Recipe_Ing",
  definition(t) {
    t.nonNull.int("id");
    t.string("amount");
    t.nonNull.boolean("Sauce");
    t.field("ingredient", {
      type: "Ingredient",
      resolve: (parent, _, context) => {
        return context.prisma.Users_Recipes.findUnique({
          where: { id: parent.id || undefined },
        }).recipe();
      },
    });
    t.field("recipe", {
      type: "Recipe",
      resolve: (parent, _, context) => {
        return context.prisma.Users_Recipes.findUnique({
          where: { id: parent.id || undefined },
        }).user();
      },
    });
  },
});
