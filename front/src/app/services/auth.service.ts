import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from 'app/store/auth/auth.actions';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly path = "http://localhost:8080/api/auth";
  private readonly store = inject(Store);


  constructor(private http: HttpClient, private router: Router) { }

  signUp(payload: any) {
    return this.http.post<any>(`${this.path}/account`, { ...payload })
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.path}/token`, { email, password })
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  private handleUser(payload: any) {
    const { token, ...user } = payload;
    if (token) {
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('token', token);
      this.store.dispatch(AuthActions.success({ token, user }));
      this.router.navigate(['/'])
    }
  }

  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = errorRes.error?.message;
    return throwError(() => new Error(errorMessage));
  }
}
