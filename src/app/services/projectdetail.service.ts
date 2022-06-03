import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { OperationProject } from '../models/OperationProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectdetailService {


// @ts-ignore
  private ProjectOperationsbaseURL = window["cfgApiBaseUrl"];
  response:any;

  path="projectsmanager/projectoperations";

  

  constructor(private httpClient:HttpClient) {} 
  
  getProjectOperationsList(annee:number,num:number): Observable<OperationProject[]>{
    return this.httpClient.get<OperationProject[]>(`${this.ProjectOperationsbaseURL+"/projectoperations"}/${annee}/${num}`);
  }

  createOperationsProject(opr:OperationProject): Observable<object>{
    return this.httpClient.post(`${this.ProjectOperationsbaseURL+this.path}`,opr);
  }

  getOperation(annee:number,num:number,numopr:number): Observable<OperationProject>{
    return this.httpClient.get<OperationProject>(`${this.ProjectOperationsbaseURL+this.path}/${annee}/${num}/${numopr}`);
  }  

  deleteOperation(annee:number,num:number,numopr:number): Observable<any>{
    return this.httpClient.delete(`${this.ProjectOperationsbaseURL+this.path}/${annee}/${num}/${numopr}`);
  } 

  UpdateOperation(opr:OperationProject,annee:number,num:number,numopr:number): Observable<object>{
    return this.httpClient.put(`${this.ProjectOperationsbaseURL+this.path}/${annee}/${num}/${numopr}`,opr);
  }    

  printReportOperation(annee:number,num:number,numopr:number){
    
    // this.response= this.httpClient.get<OperationProject>(`${this.ProjectOperationsbaseURL+"/reports/pdf"}/${annee}/${num}/${numopr}`);
    // const blob = new Blob([this.response],{'type':'application/pdf'})
    // const url = window.URL.createObjectURL(blob);
    window.open(`${this.ProjectOperationsbaseURL+"/reports/pdf"}/${annee}/${num}/${numopr}`);
  }  

  
 

    
  

}
