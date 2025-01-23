import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CourseItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  course_id: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  price: number;
}
export enum PaymentMethod {
  PAYMENT_BARIDI = 'payment_baridi',
  PAYMENT_PCA = 'payment_pca',
  PAYMENT_ONLINE = 'payment_online',
  PAYMENT_ON_SITE = 'payment_on_site',
}

export enum Status {
  ORDER_IN_PROCESS = 'ORDER_IN_PROCESS',
  ORDER_APPROVED = 'ORDER_APPROVED',
  ORDER_DECLINED = 'ORDER_DECLINED',
}

export class PaymantDto {
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method: PaymentMethod;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  price: number;
}

export class StoreOrdersDTO {
  @IsNumber()
  @IsOptional()
  coupon_id?: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CourseItemDto)
  courses: CourseItemDto[];

  payment: PaymantDto;

  @IsNumber()
  discount: number;
}
export class UpdateOrderDTO {
  status: Status;
}
export class UploadReceiptDTO {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  order_id: number;

  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  media_url?: string;
}
