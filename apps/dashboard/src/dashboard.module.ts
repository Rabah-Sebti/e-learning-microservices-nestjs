import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { PrismaModule } from '@app/common';
import { AdminModule } from './admin/admin.module';
import { BannerModule } from './banner/banner.module';
import { CategoryModule } from './category/category.module';
import { ChapterModule } from './chapter/chapter.module';
import { ChoiceModule } from './choice/choice.module';
import { ContactModule } from './contact/contact.module';
import { CourseModule } from './course/course.module';
import { InstructorModule } from './instructor/instructor.module';
import { LessonModule } from './lesson/lesson.module';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductSubCategoryModule } from './product-sub-category/product-sub-category.module';
import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { CourseOrdersModule } from './course-orders/course-orders.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatInterceptor } from './response.interceptor';
import { I18nModule } from 'nestjs-i18n';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
// import path from 'path';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',

      loaderOptions: {
        path: path.join(__dirname, 'i18n'),
        watch: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/dashboard/.env',
    }),
    AuthAdminModule,
    PrismaModule,
    AdminModule,
    BannerModule,
    CategoryModule,
    ChapterModule,
    ChoiceModule,
    ContactModule,
    CourseModule,
    InstructorModule,
    LessonModule,
    ProductModule,
    ProductCategoryModule,
    ProductSubCategoryModule,
    QuestionModule,
    QuizModule,
    CourseOrdersModule,
    SubCategoryModule,
    UserModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseFormatInterceptor },
  ],
})
export class DashboardModule {}
