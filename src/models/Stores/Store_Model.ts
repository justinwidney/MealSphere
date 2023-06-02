import { interfaceType, objectType } from "nexus";

export const Store = objectType({
  name: "Store",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("storeName");
    t.nonNull.string("storeAddress");
    t.nonNull.string("storeCity");
    t.nonNull.string("storeState");
    t.nonNull.string("storeLong");
    t.nonNull.string("storeLat");
    t.string("storeWebsite");
    t.string("storeHours");

    t.list.field("User_Store", {
      type: "User_Store",
      resolve: (parent, _, context) => {
        return context.prisma.User.findUnique({
          where: { id: parent.id || undefined },
        }).User_Store();
      },
    });
  },
});
