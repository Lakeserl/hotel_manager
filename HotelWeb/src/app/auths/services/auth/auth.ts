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

  register(data: any) {
    // Đảm bảo gửi cả role lên backend
    return this.http.post<any>(BASIC_URL + 'api/auth/signup', data);
  }

  login(data: any) {
    // Đảm bảo gửi cả role lên backend
    return this.http.post<any>(BASIC_URL + 'api/auth/login', data);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
