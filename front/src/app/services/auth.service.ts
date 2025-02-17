import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from 'app/store/auth/auth.actions';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly path = "http://localhost:8080/api/auth";
  isLoggedIn = false;
  userSub = new BehaviorSubject<any>(null);
  clearTimeout: any;
  private readonly store = inject(Store);


  constructor(private http: HttpClient, private router:Router ) { }

  signUp(email: string, password: string) {
    return this.http.post<any>(`${this.path}/account`, { email, password })
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.path}/token`, { email, password })
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  private handleUser(payload: any) {
    const { token, ...user } = payload;
    if (token) {
      this.userSub.next({ ...user });
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('token', token);
      this.store.dispatch(AuthActions.success({ token, user }));
      this.router.navigate(['/'])
    }
  }

  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Error Occurred';
    if (!errorRes.error || !errorRes.error.error) {
        return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'Email Already Exists';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email Not Found';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'Invalid Password';
            break;
    }
    return throwError(() => new Error(errorMessage));
}

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 1000);
    });
  }

}
