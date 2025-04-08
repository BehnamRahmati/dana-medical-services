-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_commentId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "commentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
