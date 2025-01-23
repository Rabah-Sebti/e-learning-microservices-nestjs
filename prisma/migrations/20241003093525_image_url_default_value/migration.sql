-- AlterTable
ALTER TABLE "banners" ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "image_url" DROP DEFAULT;

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "image_url" DROP DEFAULT;

-- AlterTable
ALTER TABLE "instructors" ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "image_url" DROP DEFAULT;
