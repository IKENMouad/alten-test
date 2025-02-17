import {
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthFacade } from 'app/store/auth/auth.facade';
import { Observable, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';


export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authFacade = inject(AuthFacade);


  authFacade.token$.subscribe({
    next: (val) => {
      if (val) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${val}` } });
      }
    }
  });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const ignoreAPIs = ['/auth/'];
      if (ignoreAPIs.some(api => req.url.includes(api))) {
        return throwError(() => error);
      }

      return throwError(() => error);
    })
  );
}