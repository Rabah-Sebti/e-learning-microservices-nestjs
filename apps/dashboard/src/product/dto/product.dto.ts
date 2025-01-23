import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  discount_price: number;

  @IsString()
  @IsNotEmpty()
  badge: string;

  @IsOptional()
  image?: string;

  @IsBoolean()
  @Type(() => Boolean)
  available: boolean;

  media_urls?: string[];

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  category_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  sub_category_id: number;
}

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  detail?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  discount_price?: number;

  @IsOptional()
  @IsString()
  badge?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  available?: boolean;

  @IsOptional()
  media_urls?: string[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  category_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sub_category_id?: number;
}
