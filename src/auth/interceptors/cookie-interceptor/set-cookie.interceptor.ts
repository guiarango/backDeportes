import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        if (data.refreshTokenId && data.refreshToken) {
          response.cookie('refreshTokenId', data.refreshTokenId, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: parseInt(
              this.configService.get('JWT_REFRESH_TOKEN_EXPIRY'),
            ),
          });

          response.cookie('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: parseInt(
              this.configService.get('JWT_REFRESH_TOKEN_EXPIRY'),
            ),
          });
        }
        return data;
      }),
    );
  }
}
