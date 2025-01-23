import { Controller, Get } from '@nestjs/common';
import { ProductSubCategoryService } from './product-sub-category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Sub Categories')
@Controller('product-sub-categories')
export class ProductSubCategoryController {
  constructor(private productSubCategoryService: ProductSubCategoryService) {}

  @Get()
  getCategories() {
    return this.productSubCategoryService.getSubCategories();
  }
}
