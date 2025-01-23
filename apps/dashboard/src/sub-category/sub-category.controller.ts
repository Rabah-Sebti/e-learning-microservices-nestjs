import {
  Body,
  Controller,
  Delete,
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
import { SubCategoryService } from './sub-category.service';
import {
  CreateSubCategoryDTO,
  GetSubCategoriesDTO,
  UpdateSubCategoryDTO,
} from './dto';
import { JwtGuard } from '../auth-admin/guard';
import { DeleteRecordsDto } from '../category/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course Sub Categories')
@Controller('course_sub_categories')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}
  @UseGuards(JwtGuard)
  @Post()
  createSubCategory(@Body() body: CreateSubCategoryDTO) {
    return this.subCategoryService.createSubCategory(body);
  }

  @Get()
  getSubCategories(
    @Query(new ValidationPipe({ transform: true })) query: GetSubCategoriesDTO,
  ) {
    return this.subCategoryService.getSubCategories(query);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getOneSubcategory(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    subCategoryId: number,
  ) {
    return this.subCategoryService.getOneSubCategory(subCategoryId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateSubCategory(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    subCategoryId: number,
    @Body() body: UpdateSubCategoryDTO,
  ) {
    return this.subCategoryService.updateSubCategory(subCategoryId, body);
  }

  @UseGuards(JwtGuard)
  @Delete()
  deleteCategory(@Body() body: DeleteRecordsDto) {
    return this.subCategoryService.deleteSubCategory(body);
  }
}
