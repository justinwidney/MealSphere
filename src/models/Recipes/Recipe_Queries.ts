import { objectType, extendType } from "nexus";
import { userInfo } from "os";

export const Recipe_Query = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("myRecipes", {
      type: "User",
      resolve: async (_parent, _args, context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            id: context.id,
          },
        });

        return await context.prisma.Users_Recipes.findMany({
          where: {
            userid: user.id,
          },
        });
      },
    });
  },
});
