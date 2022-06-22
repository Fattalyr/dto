import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable, tap } from 'rxjs';

import { FastifyReply } from 'fastify';

import { IResponse } from '../common/types';


@Injectable()
export class StatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<FastifyReply>();

    return next
      .handle()
      .pipe(
        tap((res: IResponse<unknown>) => response.statusCode = res.status),
      );
  }
}
