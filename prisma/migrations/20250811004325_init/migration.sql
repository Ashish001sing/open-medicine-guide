-- CreateTable
CREATE TABLE "Medicine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "uses" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "sideEffects" TEXT NOT NULL,
    "prohibited" TEXT NOT NULL,
    "warnings" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "recommended" TEXT NOT NULL,
    "precautions" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_name_key" ON "Medicine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Disease_name_key" ON "Disease"("name");
