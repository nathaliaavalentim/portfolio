/*
  Warnings:

  - You are about to drop the column `dateSession` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "dateSession",
DROP COLUMN "schedule",
ADD COLUMN     "conteudo" TEXT,
ADD COLUMN     "criador" TEXT;
