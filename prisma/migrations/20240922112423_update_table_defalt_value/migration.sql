-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "course_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "course_id" DROP DEFAULT,
ALTER COLUMN "chapter_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "course_category" DROP DEFAULT,
ALTER COLUMN "course_sub_category" DROP DEFAULT;
