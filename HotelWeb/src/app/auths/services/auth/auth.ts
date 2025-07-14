import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http:HttpClient, private router: Router) { }

  register(signupRequest:any):Observable<any>{
    return this.http.post(BASIC_URL + "api/auth/signup", signupRequest);
  }

  login(loginRequest: any):Observable<any>{
    return this.http.post(BASIC_URL + "api/auth/login", loginRequest);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
