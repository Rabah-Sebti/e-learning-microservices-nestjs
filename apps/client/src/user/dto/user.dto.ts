import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsJWT,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export enum Diploma {
  license = 'license',
  master = 'master',
  doctor = 'doctor',
  professor = 'professor',
}
export enum Domain {
  midicine = 'midicine',
  pharmacy = 'pharmacy',
  dentist = 'dentist',
}

export class UpdateProfileDTO {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsPhoneNumber('DZ')
  mobile?: string;

  @IsOptional()
  @IsEnum(Diploma)
  diploma?: Diploma;

  @IsOptional()
  bio?: string;

  @IsOptional()
  @IsEnum(Domain)
  domain?: Domain;
}

export class UpdateAccountDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsBoolean()
  change_password: boolean;
}

export class ResetPasswordDTO {
  @IsJWT()
  @IsNotEmpty()
  token: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  new_password: string;

  @IsNotEmpty()
  @IsString()
  password_confirmation: string;
}
