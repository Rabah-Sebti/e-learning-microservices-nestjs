import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDTO, UpdateProductCategoryDTO } from './dto';
import { JwtGuard } from '../auth-admin/guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Categories')
@UseGuards(JwtGuard)
@Controller('product_categories')
export class ProductCategoryController {
  constructor(private categoryService: ProductCategoryService) {}

  @Post()
  createCategory(@Body() body: CreateProductCategoryDTO) {
    return this.categoryService.createCategory(body);
  }

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getOneCategory(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.categoryService.getOneCategory(id);
  }

  @Patch(':id')
  updateCategory(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body: UpdateProductCategoryDTO,
  ) {
    return this.categoryService.updateCategory(id, body);
  }
}
