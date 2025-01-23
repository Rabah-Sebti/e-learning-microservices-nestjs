import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AboutService } from './about.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('About')
@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Get()
  getAboutData() {
    return this.aboutService.getAboutData();
  }
}
