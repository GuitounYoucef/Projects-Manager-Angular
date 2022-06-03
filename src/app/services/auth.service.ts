import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable } from 'rxjs';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import { Userpayload } from '../models/Userpayload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
// @ts-ignore
 private ProjectOperationsbaseURL = window["cfgApiBaseUrl"];

  constructor(private httpClient:HttpClient,
              private localStorage:LocalStorageService,
              private router:Router) { }

  login(userpayload:Userpayload):Observable<boolean>{
      return this.httpClient.post<AuthenticationResponse>(`${this.ProjectOperationsbaseURL+"/auth/login"}`,userpayload).pipe(map(data =>{
        this.localStorage.store('authenticationToken',data.authenticationToken);
        this.localStorage.store('username',data.username);
        this.router.navigate(['home']);
        return true;
      }));
      
  }
  isAuthenticated():boolean{
    return this.localStorage.retrieve('username')!=null;
  }

  getUserName(){
    return this.localStorage.retrieve('username');
  }

  logout()
  {
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
  }
}
