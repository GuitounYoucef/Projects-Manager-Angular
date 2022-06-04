import { Direction } from '@angular/cdk/bidi';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnChanges {
  direction: Direction = "rtl";

  loginform: FormGroup = new FormGroup(
    {
      username:new FormControl(),
      password:new FormControl()
    });
  constructor(private authservice:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    if (this.authservice.isAuthenticated())
    {
        this.router.navigate(["home"]);
    }
  }
  ngOnChanges(): void {

  }


  onSubmit(){
    if(this.loginform.valid)
    {
    this.authservice.login(this.loginform.value).subscribe(data=>{
      console.log(data);
    });
  }
  else alert("خطأ في حجز البيانات");

  }
}
