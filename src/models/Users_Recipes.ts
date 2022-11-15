import { objectType } from "nexus";

export const Users_Recipes = objectType({
  name: "Users_Recipes",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("amount");
    t.field("user", {
      type: "User",
      resolve: (parent, _, context) => {
        return context.prisma.Users_Recipes.findUnique({
          where: { id: parent.id || undefined },
        }).recipes();
      },
    });
    t.field("recipes", {
      type: "Recipe",
      resolve: (parent, _, context) => {
        return context.prisma.Users_Recipes.findUnique({
          where: { id: parent.id || undefined },
        }).user();
      },
    });
  },
});
