import { Injectable } from '@nestjs/common';
import { CreateProductSubCategoryDTO } from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class ProductSubCategoryService {
  constructor(private prisma: PrismaService) {}

  async getSubCategories() {
    const subCategories = await this.prisma.productSubCategories.findMany();
    return subCategories;
  }
}
