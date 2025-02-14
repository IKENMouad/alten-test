import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/products/data-access/user.model';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  userSub = new BehaviorSubject<any>(null);
  clearTimeout: any;

  constructor(private http: HttpClient, private router: Router) { }
  private readonly path = "http://localhost:8080/api/auth";

  signUp(email: string, password: string) {
    return this.http
      .post<any>(`${this.path}/account`,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.path}/token`,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  private handleUser(payload: User) {


    this.userSub.next({ ...payload });
    localStorage.setItem('userData', JSON.stringify(payload));
  }

  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Error Occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }




  isAuthenticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 1000);
    });
  }

}
