import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth-admin/guard';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @UseGuards(JwtGuard)
  @Post()
  createContact(@Body() body: CreateContactDto) {
    return this.contactService.createContact(body);
  }
  @Get()
  @UseGuards(JwtGuard)
  getContact() {
    return this.contactService.getContact();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  getContactById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.contactService.getContactById(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateContact(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body: UpdateContactDto,
  ) {
    return this.contactService.updateContact(id, body);
  }
}
