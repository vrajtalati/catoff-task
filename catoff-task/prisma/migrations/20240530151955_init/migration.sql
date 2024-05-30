/*
  Warnings:

  - You are about to drop the column `address` on the `WalletAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueString]` on the table `WalletAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueString` to the `WalletAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WalletAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletPassword` to the `WalletAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WalletAddress" DROP CONSTRAINT "WalletAddress_userId_fkey";

-- DropIndex
DROP INDEX "WalletAddress_address_key";

-- AlterTable
ALTER TABLE "WalletAddress" DROP COLUMN "address",
ADD COLUMN     "uniqueString" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "walletPassword" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WalletAddress_uniqueString_key" ON "WalletAddress"("uniqueString");

-- AddForeignKey
ALTER TABLE "WalletAddress" ADD CONSTRAINT "WalletAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
