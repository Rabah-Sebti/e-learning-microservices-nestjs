import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductSubCategoryDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
