import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PaymentMethod,
  Status,
  StoreOrdersDTO,
  UpdateOrderDTO,
  UploadReceiptDTO,
} from './dto/course-orders.dto';
import { PrismaService } from '@app/common';

@Injectable()
export class CourseOrdersService {
  constructor(private prisma: PrismaService) {}

  async storeCourses(userId: number, body: StoreOrdersDTO) {
    const paymant = await this.prisma.paymantCourse.create({
      data: {
        method: body.payment.method,
        price: body.payment.price,
        // discount: body.discount,
      },
    });
    const order = await this.prisma.course_Order.create({
      data: {
        paymant_id: paymant.id,
        courses: {
          connect: body.courses.map((course) => ({
            id: Number(course.course_id),
          })),
        },
        user_id: userId,
      },
    });

    return order;
  }

  async getOrders(userId: number, status: string) {
    if (!status) throw new BadRequestException('The status field is required');
    const statu = Status[status.toUpperCase()];
    if (!statu)
      throw new BadRequestException('The status field is not acceptable');
    const orders = await this.prisma.course_Order.findMany({
      where: {
        status: statu,
        user_id: userId,
      },
      include: {
        paymant_order: {
          select: {
            price: true,
          },
        },
      },
    });
    const formattedOrders = orders.map((item) => {
      return {
        id: item.id,
        created_at: item.created_at,
        uuid: item.uuid,
        payment: item.paymant_order,
      };
    });
    return formattedOrders;
  }

  async getOneOrder(userId: number, orderId: number) {
    const order = await this.prisma.course_Order.findUnique({
      where: {
        id: orderId,
        user_id: userId,
      },
      include: {
        courses: {
          select: {
            id: true,
            price: true,
            title: true,
            media_url: true,
          },
        },
      },
    });
    return {
      id: order.id,
      uuid: order.uuid,
      course_order_items: order.courses,
      discount: 0,
      created_at: order.created_at,
    };
  }

  async updateOrder(orderId: number, data: UpdateOrderDTO) {
    const order = await this.prisma.course_Order.update({
      where: { id: orderId },
      data,
    });
    return order;
  }

  async getAdminOrders() {
    const orders = this.prisma.course_Order.findMany({
      include: {
        paymant_order: {
          select: {
            method: true,
            price: true,
          },
        },
        user: {
          select: {
            full_name: true,
            email: true,
            mobile: true,
          },
        },
        courses: {
          select: {
            title: true,
          },
        },
      },
    });
    return orders;
  }

  async uploadReceipt(body: UploadReceiptDTO) {
    const order = await this.prisma.course_Order.update({
      where: {
        id: body.order_id,
      },
      data: { media_url: body.media_url },
    });
    return order;
  }
}
