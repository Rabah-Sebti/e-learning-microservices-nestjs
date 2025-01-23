import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ResponseFormatInterceptor } from './response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
    }),
  );
  // app.useStaticAssets(join(__dirname, '..', 'meddent'));
  app.useStaticAssets(join(__dirname, '../../..', 'meddent/uploads'), {
    prefix: '/meddent/uploads/', // This matches the route used for accessing images
  });
  // app.useGlobalInterceptors(new ResponseFormatInterceptor());
  // app.useGlobalFilters(new AllExceptionsFilter());
  const configClient = new DocumentBuilder()
    .setTitle('E-leanrning client example')
    .setDescription('The E-learning client API description')
    .setVersion('1.0')
    .addServer('http://localhost:3333')
    // .addTag('client', 'The client endpoints')
    .addBearerAuth()
    .build();

  const documentFactoryClient = () =>
    SwaggerModule.createDocument(app, configClient, {
      extraModels: [],
    });
  SwaggerModule.setup('client/documentation', app, documentFactoryClient, {
    jsonDocumentUrl: 'swagger/client-json',
    useGlobalPrefix: true,
  });
  await app.listen(3333);
}
bootstrap();
