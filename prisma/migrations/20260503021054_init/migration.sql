/*
  Warnings:

  - The `status` column on the `Orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `UserInteraction` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customerId,productId]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'MANAGER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'banned');

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "UserInteraction" DROP CONSTRAINT "UserInteraction_userId_fkey";

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Medicines" ADD COLUMN     "isVectored" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sideEffects" TEXT,
ADD COLUMN     "uses" TEXT,
ADD COLUMN     "vectoredAt" TIMESTAMP(3),
ALTER COLUMN "stock" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'active';

-- DropTable
DROP TABLE "UserInteraction";

-- DropEnum
DROP TYPE "orderStatus";

-- CreateTable
CREATE TABLE "SearchLog" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SearchLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,

    CONSTRAINT "ViewLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SearchLog_userId_idx" ON "SearchLog"("userId");

-- CreateIndex
CREATE INDEX "SearchLog_createdAt_idx" ON "SearchLog"("createdAt");

-- CreateIndex
CREATE INDEX "ViewLog_userId_idx" ON "ViewLog"("userId");

-- CreateIndex
CREATE INDEX "ViewLog_medicineId_idx" ON "ViewLog"("medicineId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_customerId_productId_key" ON "Card"("customerId", "productId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchLog" ADD CONSTRAINT "SearchLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewLog" ADD CONSTRAINT "ViewLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewLog" ADD CONSTRAINT "ViewLog_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
