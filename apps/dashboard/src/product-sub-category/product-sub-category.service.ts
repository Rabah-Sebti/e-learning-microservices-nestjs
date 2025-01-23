import { Injectable } from '@nestjs/common';
import {
  CreateProductSubCategoryDTO,
  GetSubCategoriesDTO,
  UpdateProductSubCategoryDTO,
} from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class ProductSubCategoryService {
  constructor(private prisma: PrismaService) {}

  async createSubCategory(body: CreateProductSubCategoryDTO) {
    const subCategory = await this.prisma.productSubCategories.create({
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
    const subCategories = await this.prisma.productSubCategories.findMany({
      where,
      select: {
        id: true,
        title: true,
        category: { select: { id: true, title: true } },
      },
    });
    return subCategories;
  }

  async getOneSubCategory(id: number) {
    const category = await this.prisma.productSubCategories.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        category: { select: { id: true, title: true } },
      },
    });
    return category;
  }
  async updateSubCategory(id: number, data: UpdateProductSubCategoryDTO) {
    const category = await this.prisma.productSubCategories.update({
      where: { id },
      data,
      select: {
        id: true,
        title: true,
        category: { select: { id: true, title: true } },
      },
    });
    return category;
  }
}
