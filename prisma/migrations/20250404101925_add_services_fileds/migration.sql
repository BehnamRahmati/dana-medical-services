/*
  Warnings:

  - You are about to drop the column `serviceId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_serviceId_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "readTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "serviceId";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
