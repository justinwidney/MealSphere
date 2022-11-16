import { objectType, extendType } from "nexus";
import { nonNull, arg } from "nexus";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

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

export const User_Query = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allUsers", {
      type: "User",
      resolve: (_parent, _args, context) => {
        return context.prisma.user.findMany();
      },
    });
    t.field("currentUser", {
      type: "User",
      resolve: (_parent, _args, context) => {
        //console.log(context);
        return context.prisma.user.findUnique({
          where: {
            id: context.id,
          },
        });
      },
    });
  },
});

export const User_Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("signupUser", {
      type: "AuthPayload",
      args: {
        data: nonNull(
          arg({
            type: "UserCreateInput",
          })
        ),
      },
      resolve: async (_, args, context) => {
        try {
          const user = await context.prisma.user.create({
            data: {
              username: args.data.username,
              password: await hashPassword(args.data.password),
            },
          });
          const token = createJWT(user);
          return { token, user };
        } catch (e) {
          throw new Error("username taken");
        }
      },
    }),
      t.nonNull.field("login", {
        type: "AuthPayload",
        args: {
          data: nonNull(
            arg({
              type: "UserCreateInput",
            })
          ),
        },
        resolve: async (_, args, context) => {
          const user = await context.prisma.user.findUnique({
            where: {
              username: args.data.username,
            },
          });

          if (!user) {
            throw new Error("No such user found");
          }

          const valid = await comparePassword(
            args.data!.password,
            user.password
          );

          if (!valid) {
            throw new Error("Invalid password");
          }
          const token = createJWT(user);
          return { token, user };
        },
      });
  },
});
