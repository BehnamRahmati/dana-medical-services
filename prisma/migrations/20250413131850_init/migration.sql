/*
  Warnings:

  - The values [MODERATOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `readTime` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `readTime` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `serviceCategoryId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `ServiceCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_bookmarkedArticles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_bookmarkedServices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_likedArticles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_likedServices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_likedcomments` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'SUPERADMIN', 'ADMIN', 'EXPERT');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_serviceCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "_bookmarkedArticles" DROP CONSTRAINT "_bookmarkedArticles_A_fkey";

-- DropForeignKey
ALTER TABLE "_bookmarkedArticles" DROP CONSTRAINT "_bookmarkedArticles_B_fkey";

-- DropForeignKey
ALTER TABLE "_bookmarkedServices" DROP CONSTRAINT "_bookmarkedServices_A_fkey";

-- DropForeignKey
ALTER TABLE "_bookmarkedServices" DROP CONSTRAINT "_bookmarkedServices_B_fkey";

-- DropForeignKey
ALTER TABLE "_likedArticles" DROP CONSTRAINT "_likedArticles_A_fkey";

-- DropForeignKey
ALTER TABLE "_likedArticles" DROP CONSTRAINT "_likedArticles_B_fkey";

-- DropForeignKey
ALTER TABLE "_likedServices" DROP CONSTRAINT "_likedServices_A_fkey";

-- DropForeignKey
ALTER TABLE "_likedServices" DROP CONSTRAINT "_likedServices_B_fkey";

-- DropForeignKey
ALTER TABLE "_likedcomments" DROP CONSTRAINT "_likedcomments_A_fkey";

-- DropForeignKey
ALTER TABLE "_likedcomments" DROP CONSTRAINT "_likedcomments_B_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "readTime",
DROP COLUMN "views",
ADD COLUMN     "read" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "articleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "articleId" TEXT,
ADD COLUMN     "serviceId" TEXT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "readTime",
DROP COLUMN "serviceCategoryId",
DROP COLUMN "views",
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "read" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "ServiceCategory";

-- DropTable
DROP TABLE "_bookmarkedArticles";

-- DropTable
DROP TABLE "_bookmarkedServices";

-- DropTable
DROP TABLE "_likedArticles";

-- DropTable
DROP TABLE "_likedServices";

-- DropTable
DROP TABLE "_likedcomments";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "articleId" TEXT,
    "serviceId" TEXT,
    "commentId" TEXT,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "View" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "articleId" TEXT,
    "serviceId" TEXT,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "articleId" TEXT,
    "serviceId" TEXT,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_articleId_serviceId_commentId_key" ON "Like"("userId", "articleId", "serviceId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "View_userId_articleId_serviceId_ipAddress_key" ON "View"("userId", "articleId", "serviceId", "ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_articleId_serviceId_key" ON "Bookmark"("userId", "articleId", "serviceId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
