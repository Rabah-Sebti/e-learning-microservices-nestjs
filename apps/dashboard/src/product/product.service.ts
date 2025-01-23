import { Injectable } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from './dto';
import { PrismaService } from '@app/common';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(body: CreateProductDTO) {
    const product = await this.prisma.product.create({
      data: body,
    });
    return product;
  }
  async getProducts() {
    const products = await this.prisma.product.findMany({
      include: {
        category: { select: { id: true, title: true } },
        sub_category: { select: { id: true, title: true } },
      },
    });

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

  async updateProduct(productId: number, body: UpdateProductDTO) {
    const product = await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: body,
    });
    return product;
  }
}
