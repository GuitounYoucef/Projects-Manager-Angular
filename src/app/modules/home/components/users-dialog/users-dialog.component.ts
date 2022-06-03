import { Direction } from '@angular/cdk/bidi';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectdetailService } from '../../../../services/projectdetail.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css']
})
export class UsersDialogComponent implements OnInit {
  direction: Direction = "rtl";
  usersForm !: FormGroup;
  buttonCaption = 'حــفظ';
  buttonicon = 'save';
  formCaption = 'إضافة مرحلة جديدة';
  hide=true;

  constructor(private formBuilder: FormBuilder,
              private userS: UsersService,
              private dialogRef: MatDialogRef<UsersDialogComponent>
              , @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {

    this.usersForm = this.formBuilder.group({
      userName: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required,Validators.min(6)],
      accountStatus: ['', Validators.required],
    })

    if (this.editData) {
      this.usersForm.get('userName')?.patchValue(this.editData.userName);
      this.usersForm.get('role')?.patchValue(this.editData.role);
      this.usersForm.get('password')?.patchValue(this.editData.password);
      this.usersForm.get('accountStatus')?.patchValue(this.editData.accountStatus);
      console.log(this.editData.password);
    }
  }
  userAction(){
    if(!this.editData){
      this.CreateUser();
    }
    else{
       this.updateUser();
    }
  }
  CreateUser(){
    console.log(this.usersForm.value);
    this.userS.saveUser(this.usersForm.value).subscribe(data =>    
      {
        this.usersForm.reset();
        this.dialogRef.close('save');
       // console.log(data);          
      } 
      );
  }
  updateUser(){

    this.userS.updateUser(this.usersForm.value).subscribe(data =>    
      {
        this.usersForm.reset();
        this.dialogRef.close('update');
        alert("تمت عملية تعديل بيانات المستخدم بنجاح" );
       // console.log(data);          
      } 
      );
  }
  closeForm(){
    this.dialogRef.close('none');
  }

 
}
