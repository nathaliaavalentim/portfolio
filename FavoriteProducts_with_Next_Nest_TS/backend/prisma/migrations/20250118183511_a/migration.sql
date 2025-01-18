/*
  Warnings:

  - You are about to drop the column `productName` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `productPrice` on the `Favorite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "productName",
DROP COLUMN "productPrice";
