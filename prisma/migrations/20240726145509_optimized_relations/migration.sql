/*
  Warnings:

  - You are about to drop the `VoteUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserVoteItem" DROP CONSTRAINT "UserVoteItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserVoteItem" DROP CONSTRAINT "UserVoteItem_voteId_fkey";

-- DropForeignKey
ALTER TABLE "UserVoteItem" DROP CONSTRAINT "UserVoteItem_voteItemId_fkey";

-- DropForeignKey
ALTER TABLE "VoteItem" DROP CONSTRAINT "VoteItem_voteId_fkey";

-- DropForeignKey
ALTER TABLE "VoteUser" DROP CONSTRAINT "VoteUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "VoteUser" DROP CONSTRAINT "VoteUser_voteId_fkey";

-- DropTable
DROP TABLE "VoteUser";

-- DropEnum
DROP TYPE "VoteUserRelation";

-- AddForeignKey
ALTER TABLE "VoteItem" ADD CONSTRAINT "VoteItem_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoteItem" ADD CONSTRAINT "UserVoteItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoteItem" ADD CONSTRAINT "UserVoteItem_voteItemId_fkey" FOREIGN KEY ("voteItemId") REFERENCES "VoteItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoteItem" ADD CONSTRAINT "UserVoteItem_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
