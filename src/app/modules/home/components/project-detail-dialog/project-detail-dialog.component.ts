import { Direction } from '@angular/cdk/bidi';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectdetailService } from 'src/app/services/projectdetail.service';


@Component({
  selector: 'app-project-detail-dialog',
  templateUrl: './project-detail-dialog.component.html',
  styleUrls: ['./project-detail-dialog.component.css']
})
export class ProjectDetailDialogComponent implements OnInit {
  direction: Direction = "rtl";
  stepForm !: FormGroup;
  buttonCaption = 'حــفظ';
  buttonicon = 'save';
  formCaption = 'إضافة مرحلة جديدة';

  constructor(private formBuilder: FormBuilder, private projectDS: ProjectdetailService, private dialogRef: MatDialogRef<ProjectDetailDialogComponent>
    , @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {

    this.stepForm = this.formBuilder.group({
      operationkey: this.formBuilder.group({
        num: ['',],
        annee: ['', Validators.required],
        numOpr: ['', Validators.required],
      }),
      typeOpr: ['', Validators.required],
      descriptionOpr: ['', Validators.required],
      montantOpr: ['', Validators.required],
      nouvMontant: ['', Validators.required],
      ancienMontant: ['', Validators.required],
    })

    if (this.editData.annee) {
      console.log('Annee :: ' + this.editData.annee);
      console.log('Num :: ' + this.editData.num);
      this.stepForm.get('operationkey.annee')?.patchValue(this.editData.annee.toString());
      this.stepForm.get('operationkey.num')?.patchValue(this.editData.num);
      this.stepForm.get('ancienMontant')?.patchValue(this.editData.ancienMontant);
    }
    else
      if (this.editData.descriptionOpr) {
        this.buttonCaption = 'تحـديث';
        this.formCaption = 'معاينة';
        this.buttonicon = 'update';

        this.stepForm.get('operationkey.annee')?.patchValue(this.editData.operationkey.annee.toString());
        this.stepForm.get('operationkey.num')?.patchValue(this.editData.operationkey.num);
        this.stepForm.get('operationkey.numOpr')?.patchValue(this.editData.operationkey.numOpr);

        this.stepForm.get('typeOpr')?.patchValue(this.editData.typeOpr.toString());
        this.stepForm.get('descriptionOpr')?.patchValue(this.editData.descriptionOpr);
        this.stepForm.get('montantOpr')?.patchValue(this.editData.montantOpr);
        this.stepForm.get('nouvMontant')?.patchValue(this.editData.nouvMontant);
        this.stepForm.get('ancienMontant')?.patchValue(this.editData.ancienMontant);

        console.log(this.editData);
      }
  }

  stepAction() {
    if(this.stepForm.valid)
    {
    if (this.editData.annee) {
      this.createStep();
    }
    else {
      this.updateStep();
    }
  }
    else alert("خطأ في حجز البيانات");
  }

  createStep() {
    console.log(this.stepForm.value);
    this.projectDS.createOperationsProject(this.stepForm.value).subscribe(data => {
      this.stepForm.reset();
      this.dialogRef.close('save');
      // console.log(data);          
    }
    );
  }


  updateStep() {
    this.projectDS.UpdateOperation(this.stepForm.value,
      this.editData.operationkey.annee
      , this.editData.operationkey.num,
      this.editData.operationkey.numOpr)
      .subscribe(data => {
        this.stepForm.reset();
        this.dialogRef.close('update');
        alert("step saved");
        // console.log(data);          
      }
      );
  }

  closeForm() {
    this.dialogRef.close('none');
  }

  montantOprChange(event: any) {
    if (this.stepForm.get('typeOpr')?.value) {
      let x: number = 0;
      
      if (this.stepForm.get('typeOpr')?.value == -1)
        x = Number(this.stepForm.get('ancienMontant')?.value) - Number(event.target.value);
      else if (this.stepForm.get('typeOpr')?.value == 1)
        x = Number(this.stepForm.get('ancienMontant')?.value) + Number(event.target.value);
      if ((x >= 0) && (this.stepForm.get('typeOpr')?.value != 0)){
        this.stepForm.get('nouvMontant')?.patchValue(x);
      }
      else
      if ((x == 0) && (this.stepForm.get('typeOpr')?.value == 0))
      {
        this.stepForm.get('nouvMontant')?.patchValue(Number(this.stepForm.get('ancienMontant')?.value));
        this.stepForm.get('montantOpr')?.patchValue(0);
      }
      else {
        alert(' مبلغ العملية ' + event.target.value + ' أكبر من الرصيد القديم ' + this.stepForm.get('ancienMontant')?.value)
        this.stepForm.get('montantOpr')?.patchValue('');
        this.stepForm.get('nouvMontant')?.patchValue(this.stepForm.get('ancienMontant')?.value);
      }
    } else {
      this.stepForm.get('montantOpr')?.patchValue(0);
      alert('يجب عليك تحديد نوع العملية')
    }

  }
}
