import { objectType, extendType, intArg, nonNull, arg } from "nexus";
import { resolve } from "path";
import { Store } from "./Store_Model";

export const Store_Query = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("myStores", {
      type: "User",
      resolve: async (_parent, _args, context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            id: context.id,
          },
        });

        return await context.prisma.Users_Store.findMany({
          where: {
            userid: user.id,
          },
        });
      },
    }),
      t.nonNull.list.nonNull.field("allUser_Stores", {
        type: "User_Store",
        resolve: (_parent, _args, context) => {
          return context.prisma.Users_Store.findMany();
        },
      });
    t.nullable.field("StoresId", {
      type: "Store",
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.Store.findUnique({
          where: { id: args.id || undefined },
        });
      },
    });
  },
});
