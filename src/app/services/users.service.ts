import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterReq } from '../models/RegisterReq';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // @ts-ignore
  private baseUrl = window["cfgApiBaseUrl"];
  private allUsersbaseURL=this.baseUrl+"/users";

  constructor(private httpClient:HttpClient) { }

  getUsersList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.allUsersbaseURL+"/all"}`);
  }

  saveUser(userReq:RegisterReq): Observable<any>{
    return this.httpClient.post(`${this.allUsersbaseURL+"/saveuser"}`,userReq);
  }

  updateUser(userReq:RegisterReq): Observable<any>{
    return this.httpClient.put(`${this.allUsersbaseURL+"/updateuser"}`,userReq);
  }
}
