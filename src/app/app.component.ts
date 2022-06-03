import { Direction } from '@angular/cdk/bidi';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  title = 'Projects-Manager';
  sideBarOpen = true;
  direction: Direction = "rtl";


  constructor(private authService:AuthService){
     
  }
  
  isAth(){
      return this.authService.isAuthenticated();
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
