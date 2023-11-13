/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "JobOffer" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
