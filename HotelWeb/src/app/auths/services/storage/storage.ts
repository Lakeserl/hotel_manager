import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user"

@Injectable({
  providedIn: 'root'
})
export class Storage {

  constructor() { }

  static saveToken(token:string){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken():string{
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserId():string{
    const user = this.getUser();
    if(user==null){return '';}
    return user.id;
  }

  static getUserRole():string{
    const user = this.getUser();
    if(user==null){return '';}
    return user.role;
  }

  static isAdminLogIn():boolean{
    if(this.getToken() === null){
      return false;
    }
    const role:string = this.getUserRole();
    return role=='ADMIN';
  }

  static isCustomerLogIn():boolean{
    if(this.getToken() === null){
      return false;
    }
    const role:string = this.getUserRole();
    return role=='CUSTOMER';
  }

  static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
