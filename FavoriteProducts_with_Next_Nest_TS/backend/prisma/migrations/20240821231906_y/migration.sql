/*
  Warnings:

  - You are about to drop the column `conteudo` on the `tutorials` table. All the data in the column will be lost.
  - You are about to drop the column `criador` on the `tutorials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tutorials" DROP COLUMN "conteudo",
DROP COLUMN "criador",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "creator" TEXT;
