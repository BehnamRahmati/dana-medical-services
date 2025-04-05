-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'DRAFT';
