import { NestFactory } from '@nestjs/core';
import { DashboardModule } from './dashboard.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(DashboardModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
    }),
  );
  app.useStaticAssets(join(__dirname, '../../..', 'meddent/uploads'), {
    prefix: '/meddent/uploads/', // This matches the route used for accessing images
  });
  // app.useGlobalInterceptors(new ResponseFormatInterceptor());
  // app.useGlobalFilters(new AllExceptionsFilter());
  const configClient = new DocumentBuilder()
    .setTitle('E-leanrning Dashboard')
    .setDescription('The E-learning dashboard API')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    // .addTag('client', 'The client endpoints')
    .addBearerAuth()
    .build();

  const documentFactoryClient = () =>
    SwaggerModule.createDocument(app, configClient, {
      extraModels: [],
    });

  SwaggerModule.setup('dashboard/documentation', app, documentFactoryClient, {
    jsonDocumentUrl: 'swagger/dashboard-json',
    useGlobalPrefix: true,
  });
  await app.listen(3002);
}
bootstrap();
