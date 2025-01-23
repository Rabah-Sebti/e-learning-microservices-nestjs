import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CourseOrdersService } from './course-orders.service';
import { JwtGuard } from '../auth/guard';

import { GetUser } from '../auth/decorator';
import {
  Status,
  StoreOrdersDTO,
  UploadReceiptDTO,
} from './dto/course-orders.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course Orders')
@Controller('course_orders')
export class CourseOrdersController {
  constructor(private courseOrdersService: CourseOrdersService) {}

  @Post('store')
  @UseGuards(JwtGuard)
  @HttpCode(200)
  storeCourses(@GetUser('id') userId: number, @Body() body: StoreOrdersDTO) {
    return this.courseOrdersService.storeCourses(userId, body);
  }

  @Get('')
  @UseGuards(JwtGuard)
  getOrders(@GetUser('id') userId: number, @Query('status') status: Status) {
    return this.courseOrdersService.getOrders(userId, status);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  getOneOrder(
    @GetUser('id') userId: number,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    orderId: number,
  ) {
    return this.courseOrdersService.getOneOrder(userId, orderId);
  }

  @UseGuards(JwtGuard)
  @Post('payment/upload')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('receipt', {
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
  uploadReceipt(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe({ transform: true })) body: UploadReceiptDTO,
  ) {
    if (!file) throw new BadRequestException('image is required');
    const fileUrl = `meddent/uploads/${file.filename}`;
    return this.courseOrdersService.uploadReceipt({
      ...body,
      media_url: fileUrl,
    });
  }
}
