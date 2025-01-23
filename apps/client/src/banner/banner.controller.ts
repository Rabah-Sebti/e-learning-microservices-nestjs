import { Controller, Get } from '@nestjs/common';
import { BannerService } from './banner.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Banners')
@Controller('banners')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @Get()
  getBanners() {
    return this.bannerService.getBanners();
  }
}
