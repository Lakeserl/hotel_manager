import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Auth } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzSelectModule } from 'ng-zorro-antd/select';

function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const isValid = value.length >= 6 && hasLetter && hasNumber;
    return isValid ? null : { weakPassword: true };
  };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, passwordStrengthValidator()]],
      confirmPassword: [null, Validators.required],
      name: [null, Validators.required],
      role: ['CUSTOMER', Validators.required]
    }, { validators: passwordMatchValidator() });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      if (this.registerForm.errors?.['passwordMismatch']) {
        this.message.error('Passwords do not match!');
      } else if (this.registerForm.get('password')?.errors?.['weakPassword']) {
        this.message.error('Password must be at least 6 characters and contain at least one letter and one number!');
      } else {
        this.message.error('Please fill in all required fields correctly!');
      }
      return;
    }
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.id != null) {
          this.message.success('Signup successful', { nzDuration: 5000 });
          this.router.navigateByUrl('/');
        } else {
          this.message.error(`${res.message || 'Signup failed'}`, { nzDuration: 5000 });
        }
      },
      error: (err) => {
        this.loading = false;
        const backendMsg = err?.error?.message || err?.error || 'Registration failed! Please try again.';
        this.message.error(backendMsg, { nzDuration: 5000 });
      }
    });
  }
}
