import { Injectable } from '@nestjs/common';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { PrismaService } from '@app/common';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(body: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data: body,
    });
    return contact;
  }
  async getContact() {
    const contact = await this.prisma.contact.findFirst();

    return contact;
  }
  async getContactById(id: number) {
    const contact = await this.prisma.contact.findFirst({ where: { id } });

    return contact;
  }

  async updateContact(id: number, body: UpdateContactDto) {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: body,
    });
    return contact;
  }
}
