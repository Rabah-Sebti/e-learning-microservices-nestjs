import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLessonDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  course_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  chapter_id: number;

  media_url: string;
}
