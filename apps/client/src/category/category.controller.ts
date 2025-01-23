import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryParamsDTO } from './dto';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course Category')
@Controller('course_categories')
export class CategoryController {
  constructor(private categoriyService: CategoryService) {}

  @Get()
  getCategories(
    @Query(new ValidationPipe({ transform: true })) query: CategoryParamsDTO,
  ) {
    return this.categoriyService.getCategories(query);
  }
}
