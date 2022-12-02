import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  Errors?: Maybe<FieldError>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  Calories: Scalars['Int'];
  Fat: Scalars['Int'];
  IngDescription?: Maybe<Scalars['String']>;
  IngName: Scalars['String'];
  Protein: Scalars['Int'];
  id: Scalars['Int'];
  recipeHolder: Array<Recipe_Ing>;
};

export type IngredientAddInput = {
  recipeid: Scalars['Int'];
};

export type IngredientCreateInput = {
  content?: InputMaybe<Scalars['String']>;
  recipeCookTime: Scalars['Int'];
  recipeName: Scalars['String'];
  recipeServings: Scalars['Int'];
  skillLvl?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addIngredientToRecipe?: Maybe<Ingredient>;
  addRecipeToUser?: Maybe<Recipe>;
  createIngredient?: Maybe<Ingredient>;
  createRecipe?: Maybe<Recipe>;
  deleteRecipe?: Maybe<Recipe>;
  login: AuthPayload;
  signupUser: AuthPayload;
};


export type MutationAddIngredientToRecipeArgs = {
  data: IngredientAddInput;
};


export type MutationAddRecipeToUserArgs = {
  data: RecipeAddInput;
};


export type MutationCreateIngredientArgs = {
  data: IngredientCreateInput;
};


export type MutationCreateRecipeArgs = {
  data: RecipeCreateInput;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  data: UserCreateInput;
};


export type MutationSignupUserArgs = {
  data: UserCreateInput;
};

export type Query = {
  __typename?: 'Query';
  allRecipes: Array<Recipe>;
  allUser_Recipes: Array<Users_Recipes>;
  allUsers: Array<User>;
  currentUser?: Maybe<User>;
  myIngredients: Array<User>;
  myRecipes: Array<User>;
  recipeById?: Maybe<Recipe>;
};


export type QueryRecipeByIdArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['Int'];
  ingredients?: Maybe<Array<Maybe<Recipe_Ing>>>;
  recipeCookTime: Scalars['Int'];
  recipeHolder?: Maybe<Array<Maybe<Users_Recipes>>>;
  recipeName: Scalars['String'];
  recipeServings: Scalars['Int'];
};

export type RecipeAddInput = {
  recipeid: Scalars['Int'];
};

export type RecipeCreateInput = {
  content?: InputMaybe<Scalars['String']>;
  recipeCookTime: Scalars['Int'];
  recipeName: Scalars['String'];
  recipeServings: Scalars['Int'];
  skillLvl?: InputMaybe<Scalars['Int']>;
};

export type Recipe_Ing = {
  __typename?: 'Recipe_Ing';
  Sauce: Scalars['Boolean'];
  amount?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  ingredient?: Maybe<Ingredient>;
  recipe?: Maybe<Recipe>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  password: Scalars['String'];
  recipes: Array<Users_Recipes>;
  username?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type Users_IngredientsInput = {
  amount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  recipesid: Scalars['Int'];
};

export type Users_Recipes = {
  __typename?: 'Users_Recipes';
  amount: Scalars['Int'];
  id: Scalars['Int'];
  recipes?: Maybe<Recipe>;
  user?: Maybe<User>;
};

export type Users_RecipesInput = {
  amount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  recipesid: Scalars['Int'];
};

export type SignupMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'AuthPayload', token?: string | null, user?: { __typename?: 'User', id: number, username?: string | null } | null, Errors?: { __typename?: 'FieldError', field?: string | null, message?: string | null } | null } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, username?: string | null } | null };

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = { __typename?: 'Query', allRecipes: Array<{ __typename?: 'Recipe', id: number, recipeName: string }> };


export const SignupDocument = gql`
    mutation Signup($username: String!, $password: String!) {
  signupUser(data: {username: $username, password: $password}) {
    user {
      id
      username
    }
    token
    Errors {
      field
      message
    }
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    username
  }
}
    `;

export function useCurrentUserQuery(options?: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentUserQuery, CurrentUserQueryVariables>({ query: CurrentUserDocument, ...options });
};
export const RecipesDocument = gql`
    query Recipes {
  allRecipes {
    id
    recipeName
  }
}
    `;

export function useRecipesQuery(options?: Omit<Urql.UseQueryArgs<RecipesQueryVariables>, 'query'>) {
  return Urql.useQuery<RecipesQuery, RecipesQueryVariables>({ query: RecipesDocument, ...options });
};