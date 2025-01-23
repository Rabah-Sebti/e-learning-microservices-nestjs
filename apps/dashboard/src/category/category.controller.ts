import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CategoryParamsDTO,
  CreateCategoryDto,
  DeleteRecordsDto,
  UpdateCategoryDTO,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth-admin/guard';
import { ConfigService } from '@nestjs/config';

// @UseInterceptors(new ResponseFormatInterceptor())
@ApiTags('Course Category')
@Controller('course_categories')
export class CategoryController {
  constructor(private categoriyService: CategoryService) {}
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
  createCateory(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateCategoryDto,
  ) {
    // let fileUrl: string;
    // let newBody: CreateCategoryDto = body;
    // if (file) {
    if (!file) throw new BadRequestException('The Image is required');
    const fileUrl = `meddent/uploads/${file.filename}`;
    // newBody = { ...body, image_url: fileUrl };
    // }
    // const fileUrl = `http://localhost:3333/meddent/uploads/${file.filename}`;
    return this.categoriyService.createCategory({
      ...body,
      image_url: fileUrl,
    });
  }

  @Get()
  getCategories(
    // @Query(
    //   'offset',
    //   new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    // )
    // offset: number,
    // @Query(
    //   'limit',
    //   new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    // )
    // limit: number,
    @Query(new ValidationPipe({ transform: true })) query: CategoryParamsDTO,
  ) {
    return this.categoriyService.getCategories(query);
  }

  @UseGuards(JwtGuard)
  @Post(':id')
  @HttpCode(200)
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
  updateCategory(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    categoryId: number,
    @Body() body: UpdateCategoryDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let fileUrl: string;
    let newBody: UpdateCategoryDTO = body;
    if (file) {
      fileUrl = `meddent/uploads/${file.filename}`;
      newBody = { ...body, image_url: fileUrl };
    }

    return this.categoriyService.updateCategory(categoryId, newBody);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getOneCategory(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    categoryId: number,
  ) {
    return this.categoriyService.getOneCategory(categoryId);
  }

  @UseGuards(JwtGuard)
  @Delete()
  deleteCategory(
    // @Param(
    //   'id',
    //   new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    // )
    // categoryId: number,
    @Body() body: DeleteRecordsDto,
  ) {
    return this.categoriyService.deleteCategory(body);
  }
}
