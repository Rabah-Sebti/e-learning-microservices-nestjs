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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDTO, UpdateInstructorDTO } from './dto/instructor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtGuard } from '../auth-admin/guard';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('Instructors')
@Controller('instructors')
export class InstructorController {
  constructor(
    private instructorService: InstructorService,
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
  createInstructor(
    @Body() body: CreateInstructorDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let fileUrl: string;
    let newBody: CreateInstructorDTO = body;
    if (file) {
      fileUrl = `meddent/uploads/${file.filename}`;
      newBody = { ...body, image_url: fileUrl };
    }
    return this.instructorService.createInstructor(newBody);
  }

  @Get()
  getInstructors() {
    return this.instructorService.getInstructors();
  }

  @Get(':id')
  getSingleInstructor(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.instructorService.getSingleInstructor(id);
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
  updateInstructor(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body: UpdateInstructorDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let fileUrl: string;
    let newBody: UpdateInstructorDTO = body;
    if (file) {
      fileUrl = `meddent/uploads/${file.filename}`;
      newBody = { ...body, image_url: fileUrl };
    }
    return this.instructorService.updateInstructor(id, newBody);
  }
}
