import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-dashboard',
  imports: [NzFormModule, ReactiveFormsModule, NzInputModule, NzButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  
  roomDetailsForm:FormGroup;

  constructor(private fb: FormBuilder,
    private message:NzMessageService,
    private router: Router,
    private adminServ:AdminService
  ){
    this.roomDetailsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  submitForm(){
    this.adminServ.DashboardDetails(this.roomDetailsForm.value).subscribe(res => {
      this.message.success(`Room Posted Successfully`, {nzDuration: 5000});
      this.router.navigateByUrl('./admin/dashboard')
    }, error => {
      this.message.error(
        `${error.error}`,
        {nzDuration: 5000}
      )
    })
  }

}
