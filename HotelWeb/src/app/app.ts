import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Route, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Storage } from './auths/services/storage/storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NzLayoutModule, ReactiveFormsModule, FormsModule, ReactiveFormsModule, NzMenuModule,NzIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected title = 'HotelWeb';

  isAdminLoggedIn: boolean = Storage.isAdminLogIn();
  isCustomerLoggedIn: boolean = Storage.isCustomerLogIn(); 

  constructor(private router: Router){}

   ngOnInit(): void {
     this.router.events.subscribe(event=> {
      if(event.constructor.name === "NavigationEnd"){
        this.isCustomerLoggedIn = Storage.isCustomerLogIn();
        this.isAdminLoggedIn = Storage.isAdminLogIn();
      }
     })
   }

   logOut(){
    Storage.signOut();
    this.router.navigateByUrl('/');
   }
}
