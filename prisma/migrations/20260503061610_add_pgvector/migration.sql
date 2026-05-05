-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "MedicineEmbedding" (
    "id" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "embedding" vector(768),
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicineEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicineEmbedding_medicineId_key" ON "MedicineEmbedding"("medicineId");

-- AddForeignKey
ALTER TABLE "MedicineEmbedding" ADD CONSTRAINT "MedicineEmbedding_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
