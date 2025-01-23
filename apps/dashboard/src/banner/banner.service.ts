import { Injectable } from '@nestjs/common';
// import { CreateBannerDTO, UpdateBannerDTO } from './dto/banner.dto';
import { PrismaService } from '@app/common';
import { UpdateBannerDTO, CreateBannerDTO } from './dto/banner.dto';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}

  async createBanner(body: CreateBannerDTO) {
    const banner = await this.prisma.banner.create({
      data: body,
    });
    return banner;
  }

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
