import { objectType, extendType } from "nexus";
import { nonNull, arg } from "nexus";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";
import { validateRegister } from "../modules/utils";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.string("username");
    t.nonNull.string("password");
    t.nonNull.string("email");
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
        console.log("test");
        return context.prisma.user.findMany();
      },
    });
    t.field("currentUser", {
      type: "User",
      resolve: async (_parent, _args, context) => {
        console.log(context.userId, "my request");
        return await context.prisma.user.findUnique({
          where: {
            id: context.userId,
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
        const errors = await validateRegister(args.data);

        console.log(errors);

        const { req } = context;

        if (errors) {
          return {
            Errors: {
              field: errors.field,
              message: errors.message,
            },
            user: {},
            token: {},
          };
        }

        try {
          const user = await context.prisma.user.create({
            data: {
              username: args.data.username,
              password: await hashPassword(args.data.password),
              email: args.data.email,
            },
          });
          const token = createJWT(user);

          return { token, user };
        } catch (e) {
          console.log(e);

          return {
            Errors: {
              field: "username",
              message: "username already taken",
            },
          };
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
      }),
      t.nonNull.field("forgotPassword", {
        type: "User",
        args: {
          data: nonNull(
            arg({
              type: "ForgotPasswordInput",
            })
          ),
        },
        resolve: async (_parent, args, context) => {
          const user = await context.prisma.user.findUnique({
            where: {
              email: args.data.email,
            },
          });

          if (!user) {
            return true;
          }

          return true;
        },
      });
  },
});
