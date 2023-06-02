-- CreateTable
CREATE TABLE "Recipe_Store" (
    "userid" INTEGER NOT NULL,
    "storeid" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Recipe_Store_pkey" PRIMARY KEY ("storeid","userid")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "categoriesName" TEXT NOT NULL,
    "subCategories" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_Store_userid_storeid_key" ON "Recipe_Store"("userid", "storeid");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_id_key" ON "Categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_categoriesName_subCategories_key" ON "Categories"("categoriesName", "subCategories");

-- AddForeignKey
ALTER TABLE "Recipe_Store" ADD CONSTRAINT "Recipe_Store_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Store" ADD CONSTRAINT "Recipe_Store_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
