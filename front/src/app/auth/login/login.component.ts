import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { catchError, map, Observable, pipe, take, } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessageModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginMode = true;
  error: string = "";
  // @ts-ignore
  myForm: FormGroup | any
  message: String = "";


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit() {
    if (!this.myForm.valid) {
      return;
    }

    this.error = "";

    let authObs: Observable<any>;

    if (this.isLoginMode) {
      authObs = this.authService.login(
        this.myForm.value.email,
        this.myForm.value.password
      );
    } else {
      authObs = this.authService.signUp(
        this.myForm.value.email,
        this.myForm.value.password
      );
    }

    authObs.subscribe({
      next: (_) => { },
      error: (err) => this.error = err
    });
  }

  getPasswordErrors(password: FormControl) {
    if (password.errors?.required) {
      return 'Password Required';
    }
    if (password.errors?.minlength) {
      return 'password is of 6 characters';
    }
  }
}
