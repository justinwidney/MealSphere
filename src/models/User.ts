import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.string("username");
    t.nonNull.string("password");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.list.nonNull.field("recipes", {
      type: "Users_Recipes",
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { userid: parent.id || undefined },
          })
          .recipes();
      },
    });
  },
});
