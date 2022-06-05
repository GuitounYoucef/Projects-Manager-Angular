import {AfterViewInit, Component, ViewChild, OnInit, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Project } from 'src/app/models/Project';
import { ListChapitre } from 'src/app/models/ListChapitre';
import { Chapitre } from 'src/app/models/Chapitre';
import { Article } from 'src/app/models/Article';
import { ProjectdialogComponent } from '../projectdialog/projectdialog.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectdetailService } from 'src/app/services/projectdetail.service';











@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  displayedColumns: string[] = ['projectkey.annee','projectkey.num','nomProjet','numChapitre','numSousChapitre','montant','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  project: Project = new Project();
  projectList:Project[]=[];
  chapitreNameList?:ListChapitre[];
  AllchapitreList?:Chapitre[];
  SchapitreList?:Chapitre[];
  articleList?:Article[];
  annee:number=2022;

  constructor(private modalService: NgbModal, private projectS:ProjectsService,
                private router:Router,private projectdetailS:ProjectdetailService,public dialog: MatDialog) {}
   
  openDialog() {
    this.dialog.open(ProjectdialogComponent, {
      width:'40%',
      data:{annee:this.annee}
    }).afterClosed().subscribe(val =>{
      if(val==='save'){
        this.getProjectsList(this.annee);
      }
    });
  }

  editProject(row:any){
    this.dialog.open(ProjectdialogComponent, {
      width:'40%',
      data:row
    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getProjectsList(this.annee);
      }
    });
} 

  ngOnInit(): void {
    this.getProjectsList(this.annee);
    this.getArticlesList();
    this.getChapitresList();
    this.getSousChapitresList();

//    console.log(this.projectList);
  }
  OnselectAnnee(event:any){
    this.annee=event.value;
    this.getProjectsList(this.annee);
  }
  onSubmit(){
    this.saveProject();
    
    

  }

  saveProject(){
    this.projectS.createProject(this.project).subscribe(data =>
     
      {
        this.getProjectsList(this.annee);
        this.project=new Project();
        console.log(data);
 
         } 
      );
}


private getProjectsList(annee:number){
  this.projectS.getProjectsList(annee).subscribe(data =>{
    this.projectList = data; 
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}



private getChapitresList(){
  this.projectS.getChapitresList().subscribe(data =>{
    this.chapitreNameList = data;    
    console.log(this.chapitreNameList);
  });

} 

OnselectChapitre(event: any) {
  this.filterSousChapitresList(event.target.value);
  //console.log("SousChapitre= "+event.target.value);
}

private filterSousChapitresList(Schp?:number){

  console.log("Schp :: "+Schp);
  console.log("AllchapitreList :: "+this.AllchapitreList);
  this.SchapitreList=this.AllchapitreList?.filter(res => res.numChapitre==Schp);
  //  console.log("SousChapitre= 2"+this.SchapitreList);
}

private getSousChapitresList(){
  this.projectS.getSousChapitresList().subscribe(data =>{
    this.AllchapitreList = data;    
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

openProject(annee:number,num:number){
  // console.log('annee :: '+annee)
  // console.log('num :: '+num)

  this.router.navigate(['ProjectDetail',annee,num]);
}

lastOpr(num:number):boolean
{
   if (num==this.projectList.length)
   return true;
   return false;
}
deleteProject(annee:number,num:number)
{ 
  this.projectS.deleteProject(annee,num).subscribe(data =>{
    this.getProjectsList(this.annee);
  }

  );
}
}
