import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    const products = await this.prisma.product.findMany();

    return products;
  }

  async getOneProduct(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: { select: { title: true } },
        sub_category: { select: { title: true } },
      },
    });
    const relatedProducts = await this.prisma.product.findMany({
      where: {
        id: {
          not: product.id,
        },
        category_id: product.category_id,
      },
    });
    return { product, related_products: relatedProducts };
  }
}
