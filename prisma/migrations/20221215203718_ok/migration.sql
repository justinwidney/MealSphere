-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Recipes" (
    "userid" INTEGER NOT NULL,
    "recipesid" INTEGER NOT NULL,

    CONSTRAINT "Users_Recipes_pkey" PRIMARY KEY ("recipesid","userid")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "recipeName" TEXT NOT NULL,
    "recipeCookTime" INTEGER NOT NULL,
    "recipeServings" INTEGER NOT NULL,
    "skillLvl" INTEGER,
    "instructions" TEXT,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Recipes_userid_recipesid_key" ON "Users_Recipes"("userid", "recipesid");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_recipeName_key" ON "Recipe"("recipeName");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_IngName_key" ON "Ingredient"("IngName");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_Ing_Ingredientid_recipeid_key" ON "Recipe_Ing"("Ingredientid", "recipeid");

-- AddForeignKey
ALTER TABLE "Users_Recipes" ADD CONSTRAINT "Users_Recipes_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Recipes" ADD CONSTRAINT "Users_Recipes_recipesid_fkey" FOREIGN KEY ("recipesid") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Ing" ADD CONSTRAINT "Recipe_Ing_Ingredientid_fkey" FOREIGN KEY ("Ingredientid") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Ing" ADD CONSTRAINT "Recipe_Ing_recipeid_fkey" FOREIGN KEY ("recipeid") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
