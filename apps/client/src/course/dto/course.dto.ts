import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  maxLength,
  MaxLength,
} from 'class-validator';

export enum Status {
  newest = 'newest',
  high_rated = 'high_rated',
  best_seller = 'best_seller',
  default = 'default',
}

export class CoursesParamsDTO {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(1, { message: 'Category IDs must contain 1 item.' })
  @ArrayMinSize(1, { message: 'Category IDs must contain 1 item.' })
  @Type(() => Number) // Automatically convert strings to numbers
  categories?: number[];

  @IsOptional()
  @IsArray()
  // @ArrayMinSize(1, { message: 'SubCategory IDs must contain at least 1 item.' })
  @Type(() => Number)
  subCategories?: number[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2, { message: 'Price ranges must contain exactly 2 values.' })
  @ArrayMaxSize(2, { message: 'Price ranges must contain exactly 2 values.' })
  @Type(() => Number)
  prices?: number[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2, { message: 'Price ranges must contain exactly 2 values.' })
  @ArrayMaxSize(2, { message: 'Price ranges must contain exactly 2 values.' })
  @Type(() => Number)
  duration?: number[];

  @IsOptional()
  @IsEnum(Status, { message: 'Invalid sort option.' })
  sortBy?: Status;

  @IsOptional()
  @IsString()
  search?: string;
}
export class UpdateProgressDTO {
  @IsNotEmpty()
  @IsNumber()
  chapter_id: number;

  @IsNotEmpty()
  @IsNumber()
  lesson_id: number;
}
