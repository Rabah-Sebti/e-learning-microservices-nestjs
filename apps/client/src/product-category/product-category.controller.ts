import { Controller, Get } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Categories')
@Controller('product_categories')
export class ProductCategoryController {
  constructor(private categoryService: ProductCategoryService) {}

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }
}
