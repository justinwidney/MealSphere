import { objectType, extendType } from "nexus";
import { userInfo } from "os";

export const Category_Query = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("myCategorys", {
      type: "User",
      resolve: async (_parent, _args, context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            id: context.id,
          },
        });

        return await context.prisma.Users_Categorys.findMany({
          where: {
            userid: user.id,
          },
        });
      },
    });
  },
});
