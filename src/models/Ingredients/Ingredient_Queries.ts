import { objectType, extendType } from "nexus";
import { userInfo } from "os";

export const Ingredient_Query = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("myIngredients", {
      type: "User",
      resolve: async (_parent, _args, context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            id: context.id,
          },
        });

        return await context.prisma.Users_Ingredients.findMany({
          where: {
            userid: user.id,
          },
        });
      },
    });
  },
});
