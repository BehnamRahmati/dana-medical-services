-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_menuId_fkey";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
