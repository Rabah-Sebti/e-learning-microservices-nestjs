import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDTO, UpdateProductCategoryDTO } from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}
  async createCategory(body: CreateProductCategoryDTO) {
    const category = await this.prisma.productCategories.create({
      data: body,
    });
    return category;
  }
  async getCategories() {
    const categories = await this.prisma.productCategories.findMany({
      select: {
        id: true,
        title: true,
        sub_categories: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return categories;
  }

  async getOneCategory(id: number) {
    const category = await this.prisma.productCategories.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
      },
    });
    return category;
  }
  async updateCategory(id: number, data: UpdateProductCategoryDTO) {
    const category = await this.prisma.productCategories.update({
      where: { id },
      data,
      select: {
        id: true,
        title: true,
      },
    });
    return category;
  }
}
