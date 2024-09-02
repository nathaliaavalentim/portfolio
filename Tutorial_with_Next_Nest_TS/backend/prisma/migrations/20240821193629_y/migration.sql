/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `performance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_order_id_fkey";

-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "itens";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "performance";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "tutorials" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "draft" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_ate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "conteudo" TEXT,
    "criador" TEXT,

    CONSTRAINT "tutorials_pkey" PRIMARY KEY ("id")
);
