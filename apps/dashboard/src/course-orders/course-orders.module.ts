import { Module } from '@nestjs/common';
import { CourseOrdersController } from './course-orders.controller';
import { CourseOrdersService } from './course-orders.service';

@Module({
  controllers: [CourseOrdersController],
  providers: [CourseOrdersService]
})
export class CourseOrdersModule {}
