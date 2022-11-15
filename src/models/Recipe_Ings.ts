import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { IsEmail } from "class-validator";
import { User } from "./User";
import { Recipe } from "./Recipes";
import { Ingredient } from "./Ingredients";

@ObjectType()
export class Recipe_Ing {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  amount: number;

  @Field((type) => Boolean)
  substitue: boolean;

  @Field((type) => Recipe)
  recipe: Recipe;

  @Field((type) => Ingredient)
  ingredient?: Ingredient;
}
