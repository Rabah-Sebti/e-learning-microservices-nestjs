import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    // const status =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Database connection error. Please try again later.';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      console.log('exeption', exception.getResponse());

      message = exception.getResponse().toString();
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'A database request error occurred.';
    }
    // const message =
    //   exception instanceof HttpException
    //     ? exception.getResponse()
    //     : 'Internal server error';

    response.status(status).json({
      data: null,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
