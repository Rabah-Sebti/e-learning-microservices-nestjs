import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
