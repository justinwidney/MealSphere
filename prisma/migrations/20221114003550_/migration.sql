-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Recipes" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "Sauce" BOOLEAN NOT NULL DEFAULT false,
    "userid" TEXT,
    "recipesid" TEXT,

    CONSTRAINT "Users_Recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "calories" INTEGER,
    "fat" INTEGER NOT NULL DEFAULT 0,
    "protien" INTEGER NOT NULL DEFAULT 0,
    "calcium" INTEGER NOT NULL DEFAULT 0,
    "iron" INTEGER NOT NULL DEFAULT 0,
    "carb" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe_Ings" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "Sauce" BOOLEAN NOT NULL DEFAULT false,
    "recipeid" TEXT,
    "ingredientid" TEXT,

    CONSTRAINT "Recipe_Ings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipes" (
    "id" TEXT NOT NULL,
    "recipeName" TEXT NOT NULL,
    "recipeCookTime" INTEGER NOT NULL,
    "recipeServings" INTEGER NOT NULL,
    "skillLvl" INTEGER,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Recipes_userid_recipesid_key" ON "Users_Recipes"("userid", "recipesid");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredients_name_key" ON "Ingredients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_Ings_ingredientid_recipeid_key" ON "Recipe_Ings"("ingredientid", "recipeid");

-- CreateIndex
CREATE UNIQUE INDEX "Recipes_recipeName_key" ON "Recipes"("recipeName");

-- AddForeignKey
ALTER TABLE "Users_Recipes" ADD CONSTRAINT "Users_Recipes_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Recipes" ADD CONSTRAINT "Users_Recipes_recipesid_fkey" FOREIGN KEY ("recipesid") REFERENCES "Recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Ings" ADD CONSTRAINT "Recipe_Ings_recipeid_fkey" FOREIGN KEY ("recipeid") REFERENCES "Recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Ings" ADD CONSTRAINT "Recipe_Ings_ingredientid_fkey" FOREIGN KEY ("ingredientid") REFERENCES "Ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
