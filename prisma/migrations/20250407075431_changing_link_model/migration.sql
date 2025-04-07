/*
  Warnings:

  - You are about to drop the `_LinkToMenu` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `menuId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_LinkToMenu" DROP CONSTRAINT "_LinkToMenu_A_fkey";

-- DropForeignKey
ALTER TABLE "_LinkToMenu" DROP CONSTRAINT "_LinkToMenu_B_fkey";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "menuId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_LinkToMenu";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
