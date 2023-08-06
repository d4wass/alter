import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {
  asyncScheduler,
  catchError,
  mergeMap,
  Observable,
  retry,
  retryWhen,
  tap,
  throwError,
  timer
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalHttpErrorHandlerInterceptor implements HttpInterceptor {
  excludedStatusCodes: number[] = [401, 403];
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe
      // tap((x) => this.retryStrategy(x))

      // retry({
      //   count: 3,
      //   delay: (_, retryCount) => timer(retryCount * 1000)
      // }),
      // catchError((err) => {
      //   console.log('error from interceptor', err);
      //   throw new Error('Error from interceptor...');
      // })
      ();
  }

  private retryStrategy =
    ({ maxRetryAttemps = 3, durationInMs = 1000, scheduler = asyncScheduler }) =>
    (attemps: Observable<any>) => {
      return attemps.pipe(
        mergeMap((error, i) => {
          const retryAttempt = i + 1;
          if (
            retryAttempt > maxRetryAttemps ||
            this.excludedStatusCodes.find((code) => code === error.status)
          ) {
            throw new Error(error);
          }
          return timer(retryAttempt * durationInMs, scheduler);
        })
      );
    };
}
