import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, Proyecto } from '../models/project';
import { Global } from './global';


@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = Global.url;
  }

  testService(){
    return "Hola desde el servicio de Angular";
  }

  saveProject(project: Project): Observable<any>{
    const param = JSON.stringify(project);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'save-project', param, {headers: headers});

  }

  saveEditProject(project: Project, id: string): Observable<any>{
    const param = JSON.stringify(project);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'project/' + id, param, {headers: headers});

  }

  getProjects(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'projects');
  }

  getProject(name: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'projectByName/' + name, {headers: headers});
  }

  getProjectByName(name: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'projectByName/' + name, {headers: headers});
  }

  getProjectById(id: string | null): Observable<any>{
    console.log('El ID que llego a getProjectById(PROJECT.SERVICE) es: ', id);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(this.url + 'project/' + id);
    return this._http.get(this.url + 'project/' + id, {headers: headers});
  }

  deleteProject(id:string) {
    console.log (this.url + 'project/' + id);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'project/' + id, {headers: headers});
  }

  updateProject(project: Proyecto): Observable<any>{
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'project/' + project.id, params, {headers: headers});
  }

}
