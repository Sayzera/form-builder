/*
  Warnings:

  - The required column `testUrl` was added to the `Form` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "testUrl" TEXT NOT NULL;
