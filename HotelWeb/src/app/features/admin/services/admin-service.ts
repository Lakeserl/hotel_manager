import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '../../../auths/services/storage/storage';

const URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  DashboardDetails(roomDTO:any):Observable<any>{
    return this.http.post(URL + "api/admin/room", roomDTO, {
      headers: this.createAuthorizationHeader(),
    })
  }

  createAuthorizationHeader() {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + Storage.getToken()
    )
  }
}
