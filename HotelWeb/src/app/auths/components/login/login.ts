import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Storage } from '../../services/storage/storage';
import { repeat } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  checkPassword() {
    const password = this.loginForm.get('password')?.value;
    const repeatPassword = this.loginForm.get('repeatPassword')?.value;
    return password === repeatPassword;
  }

  submitForm() {
    // Only send email and password for login
    const formValue = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.authService.login(formValue).subscribe(res=> {
      console.log(res);
      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }

        Storage.saveUser(user);
        Storage.saveToken(res.jwt);
      }
    }, error=>{
      this.message.error('Bad credentials', { nzDuration: 5000 });
    })
  }
}

