import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { GetSubCategoriesDTO } from './dto/sub-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course Sub Categories')
@Controller('course_sub_categories')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Get()
  getSubCategories(
    @Query(new ValidationPipe({ transform: true })) query: GetSubCategoriesDTO,
  ) {
    return this.subCategoryService.getSubCategories(query);
  }
}
