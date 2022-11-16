import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from "type-graphql";

import { Recipe } from "../models/Recipes";
import { User } from "../models/User";
import { Context } from "../db";
import { RecipeCreateInput } from "../handlers/recipe";

@InputType()
class UserUniqueInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;
}

@InputType()
class UserCreateInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field((type) => [RecipeCreateInput], { nullable: true })
  recipes: [RecipeCreateInput];
}

@Resolver(User)
export class UserResolver {
  @FieldResolver()
  async recipes(
    @Root() user: User,
    @Ctx() ctx: Context
  ): Promise<Recipe[] | null> {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .recipes();
  }

  @Mutation((returns) => User)
  async signupUser(
    @Arg("data") data: UserCreateInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    return ctx.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });
  }

  @Query(() => [User])
  async allUsers(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }
}


const  User_Mutation = objectType({
  name: "User_Mutation",
  definition(t) {
    t.nonNull.field("signupUser", {
      type: "User",
      args: {
        data: nonNull(
          arg({
            type: "UserCreateInput",
          })
        ),
      },
      resolve: async (_, args, context) => {
        const user = context.prisma.user.create({
          data: {
            username: args.data.username,
            password: await hashPassword(args.data.password)
          },
        });
        const token = createJWT(user)
        return {token,user}

      },
    })

    t.nonNull.field("login", {
      type: "User",
      args: {
        data: nonNull(
          arg({
            type: "UserCreateInput",
          })
        ),
      },
      resolve: async (parent, args, context) => {
        const user = context.prisma.user.findUnique({
          where: {
            username: args.data.username,
          },
        });

        if(!user){
          throw new Error('No such user found');
        }

        const valid = await comparePassword(args.body.password, user.password);
        
        if(!valid){
          throw new Error('Invalid password');
        }
        const token = createJWT(user);
        return token;

      },
    });