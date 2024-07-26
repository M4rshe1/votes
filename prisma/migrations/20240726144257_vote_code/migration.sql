/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_code_key" ON "Vote"("code");
