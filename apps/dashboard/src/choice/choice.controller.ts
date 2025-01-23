import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { CreateChoiceDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth-admin/guard';

@ApiTags('Choices')
@Controller('choices')
export class ChoiceController {
  constructor(private choiceService: ChoiceService) {}

  @UseGuards(JwtGuard)
  @Post()
  createChoice(@Body() body: CreateChoiceDTO) {
    return this.choiceService.createChoice(body);
  }

  @UseGuards(JwtGuard)
  @Get()
  getChoices() {
    return this.choiceService.getChoices();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  getChoiceById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.choiceService.getChoiceById(id);
  }
}
