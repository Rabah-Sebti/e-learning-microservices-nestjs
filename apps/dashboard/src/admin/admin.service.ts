import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAdminProfile(adminId: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });
    delete admin.password;
    return admin;
  }
}
