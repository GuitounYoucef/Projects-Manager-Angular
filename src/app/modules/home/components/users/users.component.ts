import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { UsersDialogComponent } from '../users-dialog/users-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['userName','role','accountStatus','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userS:UsersService, private modalService: NgbModal,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList(){
    this.userS.getUsersList().subscribe(data =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }
  openDialog()
  {
    this.dialog.open(UsersDialogComponent, {
      width:'40%',
     
    }).afterClosed().subscribe(val =>{
      if(val==='save'){
        this.getUsersList();
      }
    });
  }
  editUser(row:any){
    this.dialog.open(UsersDialogComponent, {
      width:'40%',
      data:row
    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getUsersList();
      }
    });
  }


}
