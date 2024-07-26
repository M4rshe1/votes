-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "VoteUserRelation" AS ENUM ('OWNER', 'VOTER');

-- CreateEnum
CREATE TYPE "VoteField" AS ENUM ('UPVOTE', 'DOWNVOTE', 'NEUTRAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoteUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "voteId" TEXT NOT NULL,
    "relation" "VoteUserRelation" NOT NULL DEFAULT 'VOTER',

    CONSTRAINT "VoteUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "usersCanAddItems" BOOLEAN NOT NULL DEFAULT false,
    "votesAllowed" INTEGER NOT NULL DEFAULT 0,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoteItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "gmaps" TEXT,
    "voteId" TEXT NOT NULL,

    CONSTRAINT "VoteItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVoteItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "voteItemId" TEXT NOT NULL,
    "voteId" TEXT NOT NULL,
    "voteType" "VoteField" NOT NULL DEFAULT 'NEUTRAL',

    CONSTRAINT "UserVoteItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VoteUser_id_key" ON "VoteUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_id_key" ON "Vote"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VoteItem_id_key" ON "VoteItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserVoteItem_id_key" ON "UserVoteItem"("id");

-- AddForeignKey
ALTER TABLE "VoteUser" ADD CONSTRAINT "VoteUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteItem" ADD CONSTRAINT "VoteItem_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoteItem" ADD CONSTRAINT "UserVoteItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoteItem" ADD CONSTRAINT "UserVoteItem_voteItemId_fkey" FOREIGN KEY ("voteItemId") REFERENCES "VoteItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoteItem" ADD CONSTRAINT "UserVoteItem_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
