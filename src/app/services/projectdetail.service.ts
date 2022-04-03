import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { OperationProject } from '../models/OperationProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectdetailService {


// @ts-ignore
  private ProjectOperationsbaseURL = window["cfgApiBaseUrl"]+"/projectoperations";

  constructor(private httpClient:HttpClient) {} 
  
  getProjectOperationsList(annee:number,num:number): Observable<OperationProject[]>{
    return this.httpClient.get<OperationProject[]>(`${this.ProjectOperationsbaseURL}/${annee}/${num}`);
  }

  createOperationsProject(opr:OperationProject): Observable<object>{
    return this.httpClient.post(`${this.ProjectOperationsbaseURL}`,opr);
  }

  getOperation(annee:number,num:number,numopr:number): Observable<OperationProject>{
    return this.httpClient.get<OperationProject>(`${this.ProjectOperationsbaseURL}/${annee}/${num}/${numopr}`);
  }  

  deleteOperation(annee:number,num:number,numopr:number): Observable<any>{
    return this.httpClient.delete(`${this.ProjectOperationsbaseURL}/${annee}/${num}/${numopr}`);
  } 

  UpdateOperation(opr:OperationProject,annee:number,num:number,numopr:number): Observable<object>{
    return this.httpClient.put(`${this.ProjectOperationsbaseURL}/${annee}/${num}/${numopr}`,opr);
  }    

  
 

    
  

}
