import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

import { Project } from '../models/Project';
import { Chapitre } from '../models/Chapitre';
import { Article } from '../models/Article';
import { ListChapitre } from '../models/ListChapitre';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  // @ts-ignore
  private baseUrl = window["cfgApiBaseUrl"];

  //private baseUrl="http://192.168.1.126:8085/Projectserv/projectsmanager"; // Tomcat

  //private baseUrl="http://localhost:8081/projectsmanager";

  private ProjectsbaseURL=this.baseUrl+"/projectsmanager/projects";

  private ChapitresbaseURL=this.baseUrl+"/projectsmanager/distchapitres";
  private SousChapitresbaseURL=this.baseUrl+"/projectsmanager/chapitres";

  private ArticlesbaseURL=this.baseUrl+"/projectsmanager/articles";


  constructor(private httpClient:HttpClient) {} 
  getProjectsList(annee:number): Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.ProjectsbaseURL}/${annee}`);
  }

  createProject(proj:Project): Observable<object>{
    return this.httpClient.post(`${this.ProjectsbaseURL}`,proj);
  }

  getProjectByAnneeNum(annee:number,num:number): Observable<Project>{
    console.log('request == '+`${this.ProjectsbaseURL}/${annee}/${num}`);
    return this.httpClient.get<Project>(`${this.ProjectsbaseURL}/${annee}/${num}`);
  }

  deleteProject(annee:number,num:number): Observable<any>{
    return this.httpClient.delete(`${this.ProjectsbaseURL}/${annee}/${num}`);
  } 

  UpdateProject(post:Project,annee:number,num:number): Observable<object>{
    return this.httpClient.put(`${this.ProjectsbaseURL}/${annee}/${num}`,post);
  }    

// Chapitres

  getChapitresList(): Observable<ListChapitre[]>{
    return this.httpClient.get<ListChapitre[]>(`${this.ChapitresbaseURL}`);
  }

  getSousChapitresList(): Observable<Chapitre[]>{
    return this.httpClient.get<Chapitre[]>(`${this.SousChapitresbaseURL}`);
  }


  // Articles

  getArticlesList(): Observable<Article[]>{
    return this.httpClient.get<Article[]>(`${this.ArticlesbaseURL}`);
  }
}
