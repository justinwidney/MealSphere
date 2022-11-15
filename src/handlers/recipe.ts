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

@InputType()
export class RecipeCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  recipeCookTime: number;

  @Field({ nullable: true })
  recipeServings: number;
}

@Resolver(Recipe)
export class PostResolver {
  @FieldResolver()
  author(@Root() recipe: Recipe, @Ctx() ctx: Context): Promise<User | null> {
    return ctx.prisma.recipe
      .findUnique({
        where: {
          id: Recipe.id,
        },
      })
      .recipeHolder();
  }

  @Query((returns) => Recipe, { nullable: true })
  async usersRecipes(@Root() user: User, @Ctx() ctx: Context) {
    const Users_Recipes = ctx.prisma.user
      .findUnique({
        where: { id: user.id },
      })
      .recipes({});

    return Users_Recipes;
  }

  @Query((returns) => [Recipe], { nullable: true })
  async recipeById(@Arg("id") id: number, @Ctx() ctx: Context) {
    return ctx.prisma.recipe.findUnique({
      where: { id },
    });
  }

  @Mutation((returns) => Recipe, { nullable: true })
  async deleteRecipe(
    @Arg("id", (type) => Int) id: number,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.recipe.delete({
      where: {
        id,
      },
    });
  }
}
