import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateQuizDTO {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  min_rate: number;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}

export class AnswerDTO {
  @IsNumber()
  @IsNotEmpty()
  question_id: number;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class SubmitQuizDTO {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerDTO)
  answers: AnswerDTO[];
}
