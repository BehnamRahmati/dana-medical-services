/*
  Warnings:

  - You are about to drop the column `requatedDate` on the `Request` table. All the data in the column will be lost.
  - Added the required column `requestedDate` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "requatedDate",
ADD COLUMN     "requestedDate" TIMESTAMP(3) NOT NULL;
