import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { IsEmail } from "class-validator";
import { User } from "./User";
import { Recipe } from "./Recipes";

@ObjectType()
export class Ingredient {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  amount: number;

  @Field((type) => Boolean)
  sauce: Boolean;

  @Field((type) => Recipe)
  recipe: string;

  @Field((type) => Ingredient)
  ingredient: Ingredient;
}
