import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductCategoryDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class UpdateProductCategoryDTO {
  @IsString()
  @Optional()
  title?: string;
}
