import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ProjectdetailService } from 'src/app/services/projectdetail.service';
import { Project } from 'src/app/models/Project';
import { OperationProject } from 'src/app/models/OperationProject';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../../services/projects.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectDetailDialogComponent } from '../project-detail-dialog/project-detail-dialog.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  displayedColumns: string[] = ['operationkey.numOpr','descriptionOpr','typeOpr','montantOpr','ancienMontant','nouvMontant','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  closeModal?: string;
  PD: Project = new Project();
  OprList:OperationProject[]=[];
  Opr:OperationProject=new OperationProject();
  
  anneeProj: number=0;
  numProj!: number;

  constructor(private modalService: NgbModal,private projectdetailS:ProjectdetailService,private router:Router
               ,private activaterouter:ActivatedRoute,private prjService:ProjectsService,public dialog: MatDialog) {
    

  }
    
  ngOnInit(): void {
    this.anneeProj=this.activaterouter.snapshot.params['annee'];
    this.numProj=this.activaterouter.snapshot.params['num'];

    console.log('anneeProj:: '+this.anneeProj)
    console.log('numProj :: '+this.numProj)
    this.getProjectInfo();
    this.getProjectOperationsList();
    

  }
  showTypeOpration(typeOpr:number):string{

    switch (typeOpr) {
      case 0:{
        return "لاشيء";
        break;}
        case -1:{
         return "إستهلاك";
         break;}
         case 1:{
           return "تمديد";
           break;}               
      default:{return "لاشيء";
        break;}
    }
  }
  recordCount()
  {
    return Object.keys(this.OprList).length;
  }
  lastOpr(numOpr:number):boolean
  {
     if (numOpr==this.OprList.length)
     return true;
     return false;
  }
  getancienMontant(){
    if(this.OprList.length>0)
    {
    let last:any = this.OprList[this.OprList.length-1];  
    return last.nouvMontant;
    }
    else return this.PD.montant;
  }
   
  openDialog() {
    this.dialog.open(ProjectDetailDialogComponent, {
      width:'40%',
      data:{
           annee:this.PD.projectkey.annee,
           num:this.PD.projectkey.num,
           ancienMontant:this.getancienMontant()
      }
    }).afterClosed().subscribe(val =>{
      if(val==='save'){
        this.getProjectOperationsList();
      }
    });
  }



  editOperation(row:any){
    this.dialog.open(ProjectDetailDialogComponent, {
      width:'40%',
      data:row
    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getProjectOperationsList();
      }
    });
  }
  deleteOperation(annee:number,num:number,numopr:number){
    console.log("annee : "+annee,"num : "+num,"numopr : "+numopr)
    this.projectdetailS.deleteOperation(annee,num,numopr).subscribe(data =>{
        this.getProjectOperationsList();
    }
    );

  }
  printOperation(annee:number,num:number,numopr:number){
    
    this.projectdetailS.printReportOperation(annee,num,numopr);

  }


  private getProjectOperationsList(){
    this.projectdetailS.getProjectOperationsList(this.anneeProj,this.numProj).subscribe(data =>{
      this.OprList= data; 
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }
  onSubmit(){
    this.saveOperation();
  
  }
  saveOperation(){
    
    this.projectdetailS.createOperationsProject(this.Opr).subscribe(data =>
     
      {
        this.getProjectOperationsList();
        this.Opr=new OperationProject();
        
 
         } 
      );
}

getProjectInfo(){
    this.prjService.getProjectByAnneeNum(this.anneeProj,this.numProj).subscribe(data =>
      { 
        this.PD=data;  
      });
}



  triggerModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  navigateToProjects(){
  this.router.navigate(['Projects']);
  }

}
