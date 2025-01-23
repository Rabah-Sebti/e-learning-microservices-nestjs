import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBannerDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  image_url: string;
}

export class UpdateBannerDTO {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image_url?: string;
}
