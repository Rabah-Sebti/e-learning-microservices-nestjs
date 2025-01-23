import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  diploma: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  domain: string;
}

export class SignInDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthorizationDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  exp: number;
}

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  diploma: string;

  @ApiProperty()
  domain: string;

  @ApiProperty()
  media_url: string;

  @ApiProperty({
    description: `Date of birth`,
    example: '12/12/1999',
  })
  dob: Date;

  @ApiProperty()
  state: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  @Type(() => AuthorizationDto)
  authorisation: AuthorizationDto;
}
