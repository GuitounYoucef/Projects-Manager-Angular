import { Direction } from '@angular/cdk/bidi';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Article } from '../../../../models/Article';
import { Chapitre } from '../../../../models/Chapitre';
import { ListChapitre } from '../../../../models/ListChapitre';
import { ProjectsService } from '../../../../services/projects.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-projectdialog',
  templateUrl: './projectdialog.component.html',
  styleUrls: ['./projectdialog.component.css']
})
export class ProjectdialogComponent implements OnInit, AfterViewInit {
  direction: Direction = "rtl";
  projectForm !: FormGroup;
  buttonCaption='حــفظ';
  buttonicon='save';
  

  chapitreNameList?:ListChapitre[];
  AllchapitreList?:Chapitre[];
  SchapitreList?:Chapitre[];
  articleList?:Article[];  

  constructor(private formBuilder : FormBuilder,private projectS:ProjectsService,private dialogRef:MatDialogRef<ProjectdialogComponent>
             , @Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.getArticlesList();
    this.getChapitresList();
    this.getSousChapitresList();

    this.projectForm = this.formBuilder.group({
      projectkey:this.formBuilder.group({
        num:['',],
        annee:['',Validators.required],
      }),
      id:['',Validators.required],
      nomProjet:['',Validators.required],
      numChapitre:['',Validators.required],
      numSousChapitre: ['',Validators.required],
      numArticle: ['',Validators.required],
      montant: ['',Validators.required],
      reste: ['',],
      credit: ['',],
    })
    if (this.editData.annee)
    { 
      this.projectForm.get('projectkey.annee')?.patchValue(this.editData.annee.toString());
    }
     else
      if (this.editData){
        this.buttonCaption='تحـديث';
        this.buttonicon='update';
        this.projectForm.get('nomProjet')?.patchValue(this.editData.nomProjet);
        this.projectForm.controls['numChapitre'].setValue(this.editData.numChapitre);
        this.projectForm.get('projectkey.annee')?.patchValue(this.editData.projectkey.annee.toString());
        this.projectForm.get('projectkey.num')?.patchValue(this.editData.projectkey.num);
    //    this.projectForm.controls['projectkey'].setValue({projectkey: {annee: 2020,num: 2020}});

        console.log('this.editData.projectkey.annee ::'+this.editData.projectkey.annee);
        console.log('this.editData.projectkey.num ::'+this.editData.projectkey.num);

        this.projectForm.controls['numArticle'].setValue(this.editData.numArticle);
        this.projectForm.controls['montant'].setValue(this.editData.montant);
      }
  }

  ngAfterViewInit(): void {

    
  }
  projectAction(){
    if(!this.editData){
      this.saveProject();
    }
    else{
       this.updateProject();
    }
  }
  saveProject(){
    console.log(this.projectForm.value);
    this.projectS.createProject(this.projectForm.value).subscribe(data =>    
      {
        this.projectForm.reset();
        this.dialogRef.close('save');
       // console.log(data);          
      } 
      );
  }
  updateProject(){

    this.projectS.UpdateProject(this.projectForm.value,this.editData.projectkey.annee,this.editData.projectkey.num).subscribe(data =>    
      {
        this.projectForm.reset();
        this.dialogRef.close('update');
        alert("porject saved" );
       // console.log(data);          
      } 
      );
  }
  closeForm(){
    this.dialogRef.close('none');
  }



  private getChapitresList(){
    this.projectS.getChapitresList().subscribe(data =>{
      this.chapitreNameList = data;    
      //console.log(this.chapitreNameList);

    });
  
  }
  
  OnselectChapitre(event: any) {
    console.log("SousChapitre event= "+event);
   this.filterSousChapitresList(event.value);
    
  }


  private filterSousChapitresList(Schp?:number){
  
    //console.log("Schp :: "+Schp);
   // console.log("AllchapitreList :: "+this.AllchapitreList);
    this.SchapitreList=this.AllchapitreList?.filter(res => res.numChapitre==Schp);
     //console.log("SousChapitre= 2"+this.SchapitreList);
  }
  
  private getSousChapitresList(){
    this.projectS.getSousChapitresList().subscribe(data =>{
      this.AllchapitreList = data;    
      if (this.editData){
        this.filterSousChapitresList(this.editData.numChapitre);
        this.projectForm.controls['numSousChapitre'].setValue(this.editData.numSousChapitre);
      }
    });
  }
  
  private getArticlesList(){
    this.projectS.getArticlesList().subscribe(data =>{
      this.articleList = data; 
    });
  }
  
  ///   ---- Find 
  
  getProjectChapiteName(numChap?:number){
    return this.chapitreNameList?.find(res => res.numChapitre==numChap)?.chapitre;
  }
  
  getProjectSchapitreName(numSChap?:number){
    return this.AllchapitreList?.find(res => res.numSousChapitre==numSChap)?.sousChapitre;
  }
  
  getProjectArticleName(numArt?:number){
    return this.articleList?.find(res => res.numArticle==numArt)?.nomArticle;
  }

}
