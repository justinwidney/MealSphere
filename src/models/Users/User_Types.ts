import { inputObjectType } from "nexus";

export const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.nonNull.string("password");
    t.nonNull.string("username");
    t.nonNull.string("email");
  },
});

export const UserUniqueInput = inputObjectType({
  name: "UserUniqueInput",
  definition(t) {
    t.int("id");
    t.string("email");
  },
});
