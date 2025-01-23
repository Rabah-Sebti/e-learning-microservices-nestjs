import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { I18nLang, I18nService } from 'nestjs-i18n';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller('home')
export class HomeController {
  constructor(
    private homeService: HomeService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  async getHomeData(@I18nLang() lang: string) {
    const tr = await this.i18n.translate('welcome', { lang });
    return this.homeService.getHomeData();
  }

  @Get('products')
  async getHomeProducts() {
    return this.homeService.getHomeProducts();
  }
}
