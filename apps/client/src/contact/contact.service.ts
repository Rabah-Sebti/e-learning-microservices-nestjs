import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async getContact() {
    const contact = await this.prisma.contact.findFirst();
    return contact;
  }
}
