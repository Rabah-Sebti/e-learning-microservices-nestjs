import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

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
}
