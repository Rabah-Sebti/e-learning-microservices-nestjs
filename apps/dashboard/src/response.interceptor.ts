import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  constructor(private readonly i18nService: I18nService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const lang = request.headers['accept-language'] || 'en';

    return next.handle().pipe(
      map(async (dataR) => {
        const messageSuccess = await this.i18nService.translate(
          'test.success',
          {
            lang,
          },
        );
        const messageFail = await this.i18nService.translate('test.fail', {
          lang,
        });

        if (dataR) {
          const { data, recordsTotal, pagination, message } = dataR;
          if (!message && !pagination) {
            return {
              data: dataR, // the response data
              message: messageSuccess, // default message
            };
          } else if (pagination) {
            return {
              data: data, // the response data
              recordsTotal,
              message: message ? message : messageSuccess, // default message
            };
          } else {
            const { message: message2, data } = dataR;
            return {
              data, // the response data
              message: message2 ? message2 : messageSuccess, // default message
            };
          }
        } else {
          return { data: dataR, message: messageFail };
        }
      }),
    );
  }
}
