/*
  Warnings:

  - The primary key for the `Users_Recipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Users_Recipes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Users_Recipes" DROP CONSTRAINT "Users_Recipes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Users_Recipes_pkey" PRIMARY KEY ("id");
