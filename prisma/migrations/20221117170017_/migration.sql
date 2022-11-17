/*
  Warnings:

  - You are about to drop the column `Sauce` on the `Users_Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Users_Recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "instructions" TEXT;

-- AlterTable
ALTER TABLE "Users_Recipes" DROP COLUMN "Sauce",
DROP COLUMN "amount";

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "IngName" TEXT NOT NULL,
    "IngDescription" TEXT NOT NULL,
    "Calories" INTEGER NOT NULL,
    "Fat" INTEGER NOT NULL DEFAULT 0,
    "Protein" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe_Ing" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "Sauce" BOOLEAN NOT NULL DEFAULT false,
    "Ingredientid" INTEGER,
    "recipeid" INTEGER,

    CONSTRAINT "Recipe_Ing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_IngName_key" ON "Ingredient"("IngName");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_Ing_Ingredientid_recipeid_key" ON "Recipe_Ing"("Ingredientid", "recipeid");

-- AddForeignKey
ALTER TABLE "Recipe_Ing" ADD CONSTRAINT "Recipe_Ing_Ingredientid_fkey" FOREIGN KEY ("Ingredientid") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Ing" ADD CONSTRAINT "Recipe_Ing_recipeid_fkey" FOREIGN KEY ("recipeid") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
