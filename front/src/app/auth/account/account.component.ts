import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessageModule, InputTextModule, ButtonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  error: string = "";
  // @ts-ignore
  myForm: FormGroup | any

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      username: ['', Validators.required],
      firstname: ['', Validators.required]
    });
  }

  onFormSubmit() {
    if (!this.myForm.valid) {
      return;
    }

    this.authService.signUp({ ...this.myForm.value }).subscribe({
      next: (_) => this.router.navigate(['/auth/login']),
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
