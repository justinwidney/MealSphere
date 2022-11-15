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
