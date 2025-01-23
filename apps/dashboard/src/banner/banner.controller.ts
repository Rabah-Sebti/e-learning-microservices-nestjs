import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDTO, UpdateBannerDTO } from './dto/banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth-admin/guard';
import { ConfigService } from '@nestjs/config';

@ApiTags('Banners')
@Controller('banners')
export class BannerController {
  constructor(
    private bannerService: BannerService,
    private configService: ConfigService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './meddent/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  createBanner(
    @Body() body: CreateBannerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('image is required');
    const fileUrl = `meddent/uploads/${file.filename}`;

    return this.bannerService.createBanner({ ...body, image_url: fileUrl });
  }

  @Get()
  getBanners() {
    return this.bannerService.getBanners();
  }

  @Get(':id')
  getSingleBanner(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.bannerService.getSingleBanner(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './meddent/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  updateBanner(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body: UpdateBannerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let fileUrl: string;
    let newBody: UpdateBannerDTO = body;
    if (file) {
      fileUrl = `meddent/uploads/${file.filename}`;
      newBody = { ...body, image_url: fileUrl };
    }
    return this.bannerService.updateBanner(id, newBody);
  }
}
