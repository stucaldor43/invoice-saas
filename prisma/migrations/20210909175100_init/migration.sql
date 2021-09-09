/*
  Warnings:

  - Made the column `firstName` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "fullName" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;
