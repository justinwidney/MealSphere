/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../db"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ChangePasswordInput: { // input type
    password: string; // String!
    token: string; // String!
  }
  ForgotPasswordInput: { // input type
    email: string; // String!
    username: string; // String!
  }
  IngredientAddInput: { // input type
    recipeid: number; // Int!
  }
  IngredientCreateInput: { // input type
    content?: string | null; // String
    recipeCookTime: number; // Int!
    recipeName: string; // String!
    recipeServings: number; // Int!
    skillLvl?: number | null; // Int
  }
  RecipeAddInput: { // input type
    recipeid: number; // Int!
  }
  RecipeCreateInput: { // input type
    instructions?: string | null; // String
    recipeCookTime: number; // Int!
    recipeName: string; // String!
    recipeServings: number; // Int!
    skillLvl?: number | null; // Int
  }
  RecipeLimit: { // input type
    cursor?: string | null; // String
    limit: number; // Int!
  }
  UserCreateInput: { // input type
    email: string; // String!
    password: string; // String!
    username: string; // String!
  }
  UserUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
  }
  Users_IngredientsInput: { // input type
    amount?: number | null; // Int
    id?: number | null; // Int
    recipesid: number; // Int!
  }
  Users_RecipesInput: { // input type
    amount?: number | null; // Int
    id?: number | null; // Int
    recipesid: number; // Int!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    Errors?: NexusGenRootTypes['FieldError'] | null; // FieldError
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  FieldError: { // root type
    field?: string | null; // String
    message?: string | null; // String
  }
  Ingredient: { // root type
    Calories: number; // Int!
    Fat: number; // Int!
    IngDescription?: string | null; // String
    IngName: string; // String!
    Protein: number; // Int!
    id: number; // Int!
  }
  Mutation: {};
  Pagination_Recipe: { // root type
    Recipes?: Array<NexusGenRootTypes['Recipe'] | null> | null; // [Recipe]
    hasMore: boolean; // Boolean!
  }
  Query: {};
  Recipe: { // root type
    id: number; // Int!
    instructions?: string | null; // String
    recipeCookTime: number; // Int!
    recipeName: string; // String!
    recipeServings: number; // Int!
  }
  Recipe_Ing: { // root type
    Sauce: boolean; // Boolean!
    amount?: string | null; // String
    id: number; // Int!
  }
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: number; // Int!
    password: string; // String!
    username?: string | null; // String
  }
  Users_Recipes: { // root type
    amount: number; // Int!
    id: number; // Int!
  }
}

export interface NexusGenInterfaces {
  Recipe_Fragment: NexusGenRootTypes['Recipe'];
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    Errors: NexusGenRootTypes['FieldError'] | null; // FieldError
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  FieldError: { // field return type
    field: string | null; // String
    message: string | null; // String
  }
  Ingredient: { // field return type
    Calories: number; // Int!
    Fat: number; // Int!
    IngDescription: string | null; // String
    IngName: string; // String!
    Protein: number; // Int!
    id: number; // Int!
    recipeHolder: NexusGenRootTypes['Recipe_Ing'][]; // [Recipe_Ing!]!
  }
  Mutation: { // field return type
    addIngredientToRecipe: NexusGenRootTypes['Ingredient'] | null; // Ingredient
    addRecipeToUser: NexusGenRootTypes['Recipe'] | null; // Recipe
    changePassword: NexusGenRootTypes['User']; // User!
    createIngredient: NexusGenRootTypes['Ingredient'] | null; // Ingredient
    createRecipe: NexusGenRootTypes['Recipe'] | null; // Recipe
    deleteRecipe: NexusGenRootTypes['Recipe'] | null; // Recipe
    forgotPassword: NexusGenRootTypes['User']; // User!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    signupUser: NexusGenRootTypes['AuthPayload']; // AuthPayload!
  }
  Pagination_Recipe: { // field return type
    Recipes: Array<NexusGenRootTypes['Recipe'] | null> | null; // [Recipe]
    hasMore: boolean; // Boolean!
  }
  Query: { // field return type
    allRecipes: NexusGenRootTypes['Pagination_Recipe']; // Pagination_Recipe!
    allUser_Recipes: NexusGenRootTypes['Users_Recipes'][]; // [Users_Recipes!]!
    allUsers: NexusGenRootTypes['User'][]; // [User!]!
    currentUser: NexusGenRootTypes['User'] | null; // User
    myIngredients: NexusGenRootTypes['User'][]; // [User!]!
    myRecipes: NexusGenRootTypes['User'][]; // [User!]!
    recipeById: NexusGenRootTypes['Recipe'] | null; // Recipe
  }
  Recipe: { // field return type
    id: number; // Int!
    ingredients: Array<NexusGenRootTypes['Recipe_Ing'] | null> | null; // [Recipe_Ing]
    instructions: string | null; // String
    instructionssnippet: string | null; // String
    recipeCookTime: number; // Int!
    recipeHolder: Array<NexusGenRootTypes['Users_Recipes'] | null> | null; // [Users_Recipes]
    recipeName: string; // String!
    recipeServings: number; // Int!
  }
  Recipe_Ing: { // field return type
    Sauce: boolean; // Boolean!
    amount: string | null; // String
    id: number; // Int!
    ingredient: NexusGenRootTypes['Ingredient'] | null; // Ingredient
    recipe: NexusGenRootTypes['Recipe'] | null; // Recipe
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: number; // Int!
    password: string; // String!
    recipes: NexusGenRootTypes['Users_Recipes'][]; // [Users_Recipes!]!
    username: string | null; // String
  }
  Users_Recipes: { // field return type
    amount: number; // Int!
    id: number; // Int!
    recipes: NexusGenRootTypes['Recipe'] | null; // Recipe
    user: NexusGenRootTypes['User'] | null; // User
  }
  Recipe_Fragment: { // field return type
    id: number; // Int!
    ingredients: Array<NexusGenRootTypes['Recipe_Ing'] | null> | null; // [Recipe_Ing]
    instructions: string | null; // String
    instructionssnippet: string | null; // String
    recipeCookTime: number; // Int!
    recipeHolder: Array<NexusGenRootTypes['Users_Recipes'] | null> | null; // [Users_Recipes]
    recipeName: string; // String!
    recipeServings: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    Errors: 'FieldError'
    token: 'String'
    user: 'User'
  }
  FieldError: { // field return type name
    field: 'String'
    message: 'String'
  }
  Ingredient: { // field return type name
    Calories: 'Int'
    Fat: 'Int'
    IngDescription: 'String'
    IngName: 'String'
    Protein: 'Int'
    id: 'Int'
    recipeHolder: 'Recipe_Ing'
  }
  Mutation: { // field return type name
    addIngredientToRecipe: 'Ingredient'
    addRecipeToUser: 'Recipe'
    changePassword: 'User'
    createIngredient: 'Ingredient'
    createRecipe: 'Recipe'
    deleteRecipe: 'Recipe'
    forgotPassword: 'User'
    login: 'AuthPayload'
    signupUser: 'AuthPayload'
  }
  Pagination_Recipe: { // field return type name
    Recipes: 'Recipe'
    hasMore: 'Boolean'
  }
  Query: { // field return type name
    allRecipes: 'Pagination_Recipe'
    allUser_Recipes: 'Users_Recipes'
    allUsers: 'User'
    currentUser: 'User'
    myIngredients: 'User'
    myRecipes: 'User'
    recipeById: 'Recipe'
  }
  Recipe: { // field return type name
    id: 'Int'
    ingredients: 'Recipe_Ing'
    instructions: 'String'
    instructionssnippet: 'String'
    recipeCookTime: 'Int'
    recipeHolder: 'Users_Recipes'
    recipeName: 'String'
    recipeServings: 'Int'
  }
  Recipe_Ing: { // field return type name
    Sauce: 'Boolean'
    amount: 'String'
    id: 'Int'
    ingredient: 'Ingredient'
    recipe: 'Recipe'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    email: 'String'
    id: 'Int'
    password: 'String'
    recipes: 'Users_Recipes'
    username: 'String'
  }
  Users_Recipes: { // field return type name
    amount: 'Int'
    id: 'Int'
    recipes: 'Recipe'
    user: 'User'
  }
  Recipe_Fragment: { // field return type name
    id: 'Int'
    ingredients: 'Recipe_Ing'
    instructions: 'String'
    instructionssnippet: 'String'
    recipeCookTime: 'Int'
    recipeHolder: 'Users_Recipes'
    recipeName: 'String'
    recipeServings: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addIngredientToRecipe: { // args
      data: NexusGenInputs['IngredientAddInput']; // IngredientAddInput!
    }
    addRecipeToUser: { // args
      data: NexusGenInputs['RecipeAddInput']; // RecipeAddInput!
    }
    changePassword: { // args
      data: NexusGenInputs['ChangePasswordInput']; // ChangePasswordInput!
    }
    createIngredient: { // args
      data: NexusGenInputs['IngredientCreateInput']; // IngredientCreateInput!
    }
    createRecipe: { // args
      data: NexusGenInputs['RecipeCreateInput']; // RecipeCreateInput!
    }
    deleteRecipe: { // args
      id: number; // Int!
    }
    forgotPassword: { // args
      data: NexusGenInputs['ForgotPasswordInput']; // ForgotPasswordInput!
    }
    login: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
    signupUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
  }
  Query: {
    allRecipes: { // args
      data: NexusGenInputs['RecipeLimit']; // RecipeLimit!
    }
    recipeById: { // args
      id?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  Recipe_Fragment: "Recipe"
}

export interface NexusGenTypeInterfaces {
  Recipe: "Recipe_Fragment"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    resolveType: false
    __typename: false
    isTypeOf: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}