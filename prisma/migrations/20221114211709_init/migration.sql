/*
  Warnings:

  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe_Ings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe_Ings" DROP CONSTRAINT "Recipe_Ings_ingredientid_fkey";

-- DropForeignKey
ALTER TABLE "Recipe_Ings" DROP CONSTRAINT "Recipe_Ings_recipeid_fkey";

-- DropForeignKey
ALTER TABLE "Users_Recipes" DROP CONSTRAINT "Users_Recipes_recipesid_fkey";

-- DropForeignKey
ALTER TABLE "Users_Recipes" DROP CONSTRAINT "Users_Recipes_userid_fkey";

-- DropTable
DROP TABLE "Ingredients";

-- DropTable
DROP TABLE "Recipe_Ings";

-- DropTable
DROP TABLE "Recipes";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "recipeName" TEXT NOT NULL,
    "recipeCookTime" INTEGER NOT NULL,
    "recipeServings" INTEGER NOT NULL,
    "skillLvl" INTEGER,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_recipeName_key" ON "Recipe"("recipeName");

-- AddForeignKey
ALTER TABLE "Users_Recipes" ADD CONSTRAINT "Users_Recipes_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Recipes" ADD CONSTRAINT "Users_Recipes_recipesid_fkey" FOREIGN KEY ("recipesid") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
