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

export class CreateCourseDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

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
  language: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  certified: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  featured: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  course_category: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  course_sub_category: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // Validates that each element in the array is a number
  @IsNotEmpty()
  @Type(() => Number)
  course_instructors: number[];

  media_url?: string;
}

export class UpdateCourseDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  detail?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discount_price?: number;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  certified?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  featured?: boolean;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  course_category?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  course_sub_category?: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // Validates that each element in the array is a number
  @Optional()
  @Type(() => Number)
  course_instructors?: number[];

  @IsString()
  @IsOptional()
  media_url?: string;
}

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
