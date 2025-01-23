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
import {
  CreateProductSubCategoryDTO,
  GetSubCategoriesDTO,
  UpdateProductSubCategoryDTO,
} from './dto';
import { ProductSubCategoryService } from './product-sub-category.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth-admin/guard';

@ApiTags('Product Sub Categories')
@Controller('product-sub-categories')
export class ProductSubCategoryController {
  constructor(private productSubCategoryService: ProductSubCategoryService) {}

  @Post()
  @UseGuards(JwtGuard)
  createCategory(@Body() body: CreateProductSubCategoryDTO) {
    return this.productSubCategoryService.createSubCategory(body);
  }

  @Get()
  getCategories(
    @Query(new ValidationPipe({ transform: true })) query: GetSubCategoriesDTO,
  ) {
    return this.productSubCategoryService.getSubCategories(query);
  }

  @Get(':id')
  getOneSubCategory(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.productSubCategoryService.getOneSubCategory(id);
  }

  @Patch(':id')
  updateCategory(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body: UpdateProductSubCategoryDTO,
  ) {
    return this.productSubCategoryService.updateSubCategory(id, body);
  }
}
