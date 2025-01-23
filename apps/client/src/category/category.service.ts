import { Injectable } from '@nestjs/common';
import { CategoryParamsDTO } from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

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
}
