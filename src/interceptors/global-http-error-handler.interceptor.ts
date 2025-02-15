import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, retry, throwError, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalHttpErrorHandlerInterceptor implements HttpInterceptor {
  excludedStatusCodes = [401, 403, 404];
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: (error, retryAttempt) => {
          if (retryAttempt > 3 || this.excludedStatusCodes.includes(error.status)) {
            return throwError(() => error);
          }
          return timer((retryAttempt + 1) * 2000);
        }
      }),
      catchError((err) => {
        console.error(`Request error, with msg: ${err.message} of status code: ${err.status}`);
        return throwError(
          () => new Error(`Request error, with msg: ${err.message} of status code: ${err.status}`)
        );
      })
    );
  }
}
