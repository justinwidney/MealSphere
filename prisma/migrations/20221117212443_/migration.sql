/*
  Warnings:

  - The primary key for the `Users_Recipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users_Recipes` table. All the data in the column will be lost.
  - Made the column `userid` on table `Users_Recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `recipesid` on table `Users_Recipes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Users_Recipes" DROP CONSTRAINT "Users_Recipes_recipesid_fkey";

-- DropForeignKey
ALTER TABLE "Users_Recipes" DROP CONSTRAINT "Users_Recipes_userid_fkey";

-- AlterTable
ALTER TABLE "Users_Recipes" DROP CONSTRAINT "Users_Recipes_pkey",
DROP COLUMN "id",
ALTER COLUMN "userid" SET NOT NULL,
ALTER COLUMN "recipesid" SET NOT NULL,
ADD CONSTRAINT "Users_Recipes_pkey" PRIMARY KEY ("recipesid", "userid");

-- AddForeignKey
ALTER TABLE "Users_Recipes" ADD CONSTRAINT "Users_Recipes_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Recipes" ADD CONSTRAINT "Users_Recipes_recipesid_fkey" FOREIGN KEY ("recipesid") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
