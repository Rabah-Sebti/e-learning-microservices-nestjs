import { Injectable } from '@nestjs/common';
import {
  CreateSubCategoryDTO,
  GetSubCategoriesDTO,
  UpdateSubCategoryDTO,
} from './dto';
import { DeleteRecordsDto } from '../category/dto';
import { PrismaService } from '@app/common';

@Injectable()
export class SubCategoryService {
  constructor(private prisma: PrismaService) {}

  async createSubCategory(body: CreateSubCategoryDTO) {
    const subCategory = await this.prisma.subCategory.create({
      data: body,
    });
    return subCategory;
  }

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

  async getOneSubCategory(id: number) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        category: {
          select: { id: true, title: true },
        },
      },
    });
    return subCategory;
  }

  async updateSubCategory(id: number, body: UpdateSubCategoryDTO) {
    const subCategory = await this.prisma.subCategory.update({
      where: {
        id,
      },
      select: { category: { select: { id: true, title: true } } },
      data: body,
    });
    return subCategory;
  }

  async deleteSubCategory(body: DeleteRecordsDto) {
    return this.prisma.subCategory.deleteMany({
      where: {
        id: { in: body.ids },
      },
    });
  }
}
