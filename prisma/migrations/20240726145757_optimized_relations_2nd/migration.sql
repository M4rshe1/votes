-- CreateTable
CREATE TABLE "VoteOwner" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "voteId" TEXT NOT NULL,

    CONSTRAINT "VoteOwner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VoteOwner_id_key" ON "VoteOwner"("id");

-- AddForeignKey
ALTER TABLE "VoteOwner" ADD CONSTRAINT "VoteOwner_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteOwner" ADD CONSTRAINT "VoteOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
