-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('CATEGORY_VIEW', 'MEDICINE_VIEW', 'MEDICINE_SEARCH');

-- CreateTable
CREATE TABLE "UserInteraction" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "type" "InteractionType" NOT NULL,
    "referenceId" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserInteraction_userId_idx" ON "UserInteraction"("userId");

-- CreateIndex
CREATE INDEX "UserInteraction_sessionId_idx" ON "UserInteraction"("sessionId");

-- CreateIndex
CREATE INDEX "UserInteraction_referenceId_idx" ON "UserInteraction"("referenceId");

-- CreateIndex
CREATE INDEX "UserInteraction_type_idx" ON "UserInteraction"("type");

-- CreateIndex
CREATE INDEX "UserInteraction_createdAt_idx" ON "UserInteraction"("createdAt");

-- AddForeignKey
ALTER TABLE "UserInteraction" ADD CONSTRAINT "UserInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
