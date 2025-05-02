import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  private authService: AuthService = inject(AuthService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          if (req.url.includes('/economy/v1/transactions')) {
            this.authService.logout();
          }
        }
        return throwError(() => err);
      })
    );
  }
}
