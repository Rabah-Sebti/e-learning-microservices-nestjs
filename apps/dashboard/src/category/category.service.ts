import { Injectable } from '@nestjs/common';
import {
  CategoryParamsDTO,
  CreateCategoryDto,
  DeleteRecordsDto,
  UpdateCategoryDTO,
} from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(body: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: body,
    });
    return category;
  }
  async getCategories(query: CategoryParamsDTO) {
    const { limit, offset } = query;
    const count = await this.prisma.category.count();

    if (limit) {
      const categories = await this.prisma.category.findMany({
        include: {
          sub_categories: true, // This includes the related sub_categories
        },
        take: limit,
        skip: offset * limit,
      });
      return { recordsTotal: count, data: categories, pagination: true };
    } else {
      const categories = await this.prisma.category.findMany({
        // include: {
        //   sub_categories: true, // This includes the related sub_categories
        // },
        select: {
          id: true,
          title: true,
        },
      });
      return categories;
    }
  }

  async updateCategory(categoryId: number, body: UpdateCategoryDTO) {
    const category = await this.prisma.category.update({
      where: { id: categoryId },
      data: body,
    });
    return category;
  }

  async getOneCategory(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return category;
  }

  async deleteCategory(body: DeleteRecordsDto) {
    return this.prisma.category.deleteMany({
      where: {
        id: { in: body.ids },
      },
    });
  }
}
