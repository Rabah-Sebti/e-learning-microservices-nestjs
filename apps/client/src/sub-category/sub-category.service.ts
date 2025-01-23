import { Injectable } from '@nestjs/common';
import { GetSubCategoriesDTO } from './dto/sub-category.dto';
import { PrismaService } from '@app/common';

@Injectable()
export class SubCategoryService {
  constructor(private prisma: PrismaService) {}

  async getSubCategories(query: GetSubCategoriesDTO) {
    const where: any = {};
    if (query.category_id) {
      where.category_id = {
        in: query.category_id,
      };
    }
    const subCategories = await this.prisma.subCategory.findMany({
      where,
      select: {
        id: true,
        title: true,
        category: {
          select: {
            // id: true,
            title: true,
          },
        },
      },
    });
    return subCategories;
  }
}
