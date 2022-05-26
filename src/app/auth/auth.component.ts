import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
  }
  Login(){
    if (this.authservice.isAuth==false)
    this.authservice.isAuth=true;
  }

}
