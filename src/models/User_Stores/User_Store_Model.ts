import { interfaceType, objectType } from "nexus";

export const User_Store = objectType({
  name: "User_Store",
  definition(t) {
    t.field("user", {
      type: "User",
      resolve: (parent, _, context) => {
        return context.prisma.User.findUnique({
          where: { id: parent.id || undefined },
        }).recipe();
      },
    });
    t.field("store", {
      type: "Store",
      resolve: (parent, _, context) => {
        return context.prisma.Store.findUnique({
          where: { id: parent.id || undefined },
        }).user();
      },
    });
  },
});
