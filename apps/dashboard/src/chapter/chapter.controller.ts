import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDTO, GetChaptersQuery, updateChapterDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth-admin/guard';

@ApiTags('Chapters')
@Controller('chapters')
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  @UseGuards(JwtGuard)
  @Post()
  createChapter(@Body() body: CreateChapterDTO) {
    return this.chapterService.createChapter(body);
  }

  @UseGuards(JwtGuard)
  @Get()
  getChapters() {
    return this.chapterService.getChapters();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getChapter(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.chapterService.getChapter(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateChapter(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body: updateChapterDTO,
  ) {
    return this.chapterService.updateChapter(id, body);
  }

  @UseGuards(JwtGuard)
  @Get('admin/get-all')
  getChaptersAdmin(
    @Query(new ValidationPipe({ transform: true })) query: GetChaptersQuery,
  ) {
    return this.chapterService.getChaptersAdmin(query);
  }
}
