import { objectType } from "nexus";

export const Ingredient = objectType({
  name: "Ingredient",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("IngName");
    t.string("IngDescription");
    t.nonNull.int("Calories");

    t.nonNull.int("Fat");
    t.nonNull.int("Protein");
    t.nonNull.list.nonNull.field("recipeHolder", {
      type: "Recipe_Ing",
      resolve: (parent, _, context) => {
        return context.prisma.Ingredient.findUnique({
          where: { id: parent.id || undefined },
        }).recipeHolder();
      },
    });
  },
});
