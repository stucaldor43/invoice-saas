/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('WEEKLY', 'MONTHLY', 'BIMONTHLY', 'QUARTERLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PAID', 'PENDING', 'UNPAID');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('BASIC', 'Pro', 'PREMIUM');

-- DropIndex
DROP INDEX "User.name_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "plan" "PlanType" NOT NULL;

-- CreateTable
CREATE TABLE "Client" (
    "clientId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "clientType" "ClientType" NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "ClientAddress" (
    "addressId" SERIAL NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,

    PRIMARY KEY ("addressId")
);

-- CreateTable
CREATE TABLE "UserAddress" (
    "addressId" SERIAL NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("addressId")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "invoiceId" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDue" TIMESTAMP(3) NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "posthookUrl" TEXT NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "taxRate" DECIMAL(65,30) NOT NULL,
    "subTotal" DECIMAL(65,30) NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "dateSent" TIMESTAMP(3) NOT NULL,
    "isRecurring" BOOLEAN NOT NULL,
    "billingType" "Frequency" NOT NULL,
    "userId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    PRIMARY KEY ("invoiceId")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "invoiceItemId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "invoiceId" INTEGER NOT NULL,

    PRIMARY KEY ("invoiceItemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client.email_unique" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClientAddress_clientId_unique" ON "ClientAddress"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_userId_unique" ON "UserAddress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Client" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAddress" ADD FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("invoiceId") ON DELETE CASCADE ON UPDATE CASCADE;
