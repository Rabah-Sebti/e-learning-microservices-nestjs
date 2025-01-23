import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth-admin/guard';
import { ConfigService } from '@nestjs/config';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private configService: ConfigService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
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
  createProduct(
    @Body(new ValidationPipe({ transform: true })) body: CreateProductDTO,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    let fileUrl: string;
    let mediaUrls: string[] = [];
    let newBody: CreateProductDTO = body;
    if (files && files.length > 0) {
      mediaUrls = files.map((file) => `meddent/uploads/${file.filename}`);
      fileUrl = mediaUrls[0];
      newBody = { ...body, image: fileUrl, media_urls: mediaUrls };
    }

    // const fileUrl = `http://localhost:3333/meddent/uploads/${file.filename}`;

    return this.productService.createProduct(newBody);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getOneProduct(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    productId: number,
  ) {
    return this.productService.getOneProduct(productId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      // 'images' is the field name; 10 is the max file count
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
  updateProduct(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    productId: number,
    @Body() body: UpdateProductDTO,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let fileUrl: string;
    let mediaUrls: string[] = [];
    let newBody: UpdateProductDTO = body;
    if (files && files.length > 0) {
      mediaUrls = files.map((file) => `meddent/uploads/${file.filename}`);
      fileUrl = mediaUrls[0];
      newBody = { ...body, image: fileUrl, media_urls: mediaUrls };
    }
    return this.productService.updateProduct(productId, newBody);
  }
}
