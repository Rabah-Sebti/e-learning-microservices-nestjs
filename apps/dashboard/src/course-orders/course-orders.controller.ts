import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CourseOrdersService } from './course-orders.service';
import { JwtGuard as JwtAdminGuard } from '../auth-admin/guard';

import { UpdateOrderDTO } from './dto/course-orders.dto';
import { GetAdmin } from '../auth-admin/decorator/admin.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course Orders')
@UseGuards(JwtAdminGuard)
@Controller('course_orders')
export class CourseOrdersController {
  constructor(private courseOrdersService: CourseOrdersService) {}

  @Patch(':id')
  updateOrder(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    orderId: number,
    @Body() body: UpdateOrderDTO,
  ) {
    return this.courseOrdersService.updateOrder(orderId, body);
  }

  @Get()
  getAdminOrders(@GetAdmin('id') adminId: number) {
    return this.courseOrdersService.getAdminOrders();
  }

  @Get('/approuved')
  getCoursesOrdered() {
    return this.courseOrdersService.getCoursesOrdered();
  }
}
