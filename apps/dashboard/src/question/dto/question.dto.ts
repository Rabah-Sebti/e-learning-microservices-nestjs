import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDTO {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  quiz_id: number;
}
