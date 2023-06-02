-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "storeName" TEXT NOT NULL,
    "storeAddress" TEXT NOT NULL,
    "storeLat" DOUBLE PRECISION NOT NULL,
    "storeLong" DOUBLE PRECISION NOT NULL,
    "storeCity" TEXT NOT NULL,
    "storeState" TEXT NOT NULL,
    "storeWebsite" TEXT,
    "storeHours" TEXT,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostalCode" (
    "id" SERIAL NOT NULL,
    "postalCode" TEXT NOT NULL,
    "postalCity" TEXT NOT NULL,
    "postalRegion" TEXT,
    "postalLat" DOUBLE PRECISION NOT NULL,
    "postalLong" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PostalCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Store" (
    "userid" INTEGER NOT NULL,
    "storeid" INTEGER NOT NULL,

    CONSTRAINT "User_Store_pkey" PRIMARY KEY ("storeid","userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_id_key" ON "Store"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostalCode_id_key" ON "PostalCode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostalCode_postalCode_key" ON "PostalCode"("postalCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_Store_userid_storeid_key" ON "User_Store"("userid", "storeid");

-- AddForeignKey
ALTER TABLE "User_Store" ADD CONSTRAINT "User_Store_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Store" ADD CONSTRAINT "User_Store_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
