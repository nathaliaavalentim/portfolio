/*
  Warnings:

  - You are about to drop the column `dateSession` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `name_product` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_order_id_fkey";

-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_product_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_product_id_name_product_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "dateSession",
DROP COLUMN "name",
DROP COLUMN "name_product",
DROP COLUMN "product_id",
DROP COLUMN "schedule",
ADD COLUMN     "conteudo" TEXT,
ADD COLUMN     "criador" TEXT,
ADD COLUMN     "titulo" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_id";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "itens";
