/*
  Warnings:

  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userid` column on the `Users_Recipes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recipesid` column on the `Users_Recipes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Users_Recipes" DROP CONSTRAINT "Users_Recipes_recipesid_fkey";

-- DropForeignKey
ALTER TABLE "Users_Recipes" DROP CONSTRAINT "Users_Recipes_userid_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Users_Recipes" DROP COLUMN "userid",
ADD COLUMN     "userid" INTEGER,
DROP COLUMN "recipesid",
ADD COLUMN     "recipesid" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Users_Recipes_userid_recipesid_key" ON "Users_Recipes"("userid", "recipesid");

-- AddForeignKey
ALTER TABLE "Users_Recipes" ADD CONSTRAINT "Users_Recipes_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Recipes" ADD CONSTRAINT "Users_Recipes_recipesid_fkey" FOREIGN KEY ("recipesid") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
