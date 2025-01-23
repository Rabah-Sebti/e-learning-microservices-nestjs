/*
  Warnings:

  - Added the required column `user_id` to the `courseOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courseOrders" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "courseOrders" ADD CONSTRAINT "courseOrders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
