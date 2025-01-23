import { Injectable } from '@nestjs/common';
import { UpdateBannerDTO } from './dto/banner.dto';
import { PrismaService } from '@app/common';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}

  async getBanners() {
    try {
      const banners = await this.prisma.banner.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          image_url: true,
        },
      });
      return banners;
    } catch (error) {
      console.log('error getBanners', error);
    }
  }

  async getSingleBanner(id: number) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    return banner;
  }
  async updateBanner(id: number, body: UpdateBannerDTO) {
    const banner = await this.prisma.banner.update({
      where: { id },
      data: body,
    });
    return banner;
  }
}
