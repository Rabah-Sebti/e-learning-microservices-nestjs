-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ORDER_IN_PROCESS', 'ORDER_APPROVED', 'ORDER_DECLINED');

-- CreateTable
CREATE TABLE "courseOrders" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uuid" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ORDER_IN_PROCESS',
    "paymant_id" INTEGER NOT NULL,

    CONSTRAINT "courseOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymantCourses" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "paymantCourses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_course_order" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserCourses_AB_unique" ON "_UserCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCourses_B_index" ON "_UserCourses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_course_order_AB_unique" ON "_course_order"("A", "B");

-- CreateIndex
CREATE INDEX "_course_order_B_index" ON "_course_order"("B");

-- AddForeignKey
ALTER TABLE "courseOrders" ADD CONSTRAINT "courseOrders_paymant_id_fkey" FOREIGN KEY ("paymant_id") REFERENCES "paymantCourses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCourses" ADD CONSTRAINT "_UserCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCourses" ADD CONSTRAINT "_UserCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_course_order" ADD CONSTRAINT "_course_order_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_course_order" ADD CONSTRAINT "_course_order_B_fkey" FOREIGN KEY ("B") REFERENCES "courseOrders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
