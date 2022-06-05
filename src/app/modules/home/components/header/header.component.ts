import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  username?:string;
  constructor(private authService:AuthService,private router:Router) {}

  ngOnInit(): void {
    this.username=this.authService.getUserName();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['Auth']);

  }

}
