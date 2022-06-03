import { Component, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sideBarOpen = true;
  direction: Direction = "rtl";
  constructor() { }

  ngOnInit(): void {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
