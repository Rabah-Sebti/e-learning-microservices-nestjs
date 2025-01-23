import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChoiceDTO {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;

  @IsNumber()
  @IsNotEmpty()
  question_id: number;
}
