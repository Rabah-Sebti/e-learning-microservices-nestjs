import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Instructors')
@Controller('instructors')
export class InstructorController {
  constructor(private instructorService: InstructorService) {}

  @Get()
  getInstructors() {
    return this.instructorService.getInstructors();
  }

  @Get(':id')
  getSingleInstructor(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.instructorService.getSingleInstructor(id);
  }
}
