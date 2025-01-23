import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInstructorDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsString()
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  expert: string;

  @IsString()
  detail: string;

  image_url?: string;
}

export class UpdateInstructorDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  dob?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  mobile?: string;

  @IsString()
  @IsOptional()
  expert?: string;

  @IsString()
  @IsOptional()
  detail?: string;

  @IsOptional()
  image_url?: string;
}
