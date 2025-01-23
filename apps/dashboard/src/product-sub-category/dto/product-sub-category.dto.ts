import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductSubCategoryDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}

export class UpdateProductSubCategoryDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  category_id?: number;
}

export class GetSubCategoriesDTO {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(1, { message: 'Category IDs must contain 1 item.' })
  @ArrayMinSize(1, { message: 'Category IDs must contain 1 item.' })
  @Type(() => Number) // Automatically convert strings to numbers
  category_id?: number[];
}
