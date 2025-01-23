import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { BannerModule } from './banner/banner.module';
import { ReviewModule } from './review/review.module';
import { CourseModule } from './course/course.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { LessonModule } from './lesson/lesson.module';
import { InstructorModule } from './instructor/instructor.module';
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';
import { AboutModule } from './about/about.module';
import { QuizModule } from './quiz/quiz.module';
import { CourseOrdersModule } from './course-orders/course-orders.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductSubCategoryModule } from './product-sub-category/product-sub-category.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventEmitterModule } from '@nestjs/event-emitter';
import * as path from 'path';
// import { join } from 'path';
import { I18nModule } from 'nestjs-i18n';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatInterceptor } from './response.interceptor';
import { PrismaModule } from '@app/common';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',

      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/client/.env',
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UserModule,
    PrismaModule,
    CategoryModule,
    BannerModule,
    ReviewModule,
    CourseModule,
    SubCategoryModule,
    LessonModule,
    InstructorModule,
    HomeModule,
    ContactModule,
    AboutModule,
    QuizModule,
    CourseOrdersModule,
    ProductCategoryModule,
    ProductSubCategoryModule,
    ProductModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'meddent/uploads'),
      serveRoot: 'meddent/uploads',
    }),
  ],
  providers: [
    JwtService,

    { provide: APP_INTERCEPTOR, useClass: ResponseFormatInterceptor },
  ],
})
export class AppModule {}
