import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/upload.service';

import { Global } from '../../services/global';
import {  RouterModule, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule],
  providers: [ProjectService, UploadService, HttpClient, NgForm],
  // templateUrl: '../create/create.component.html',
  templateUrl: '../create/create.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  @Input('id') _id!: string;
  public title: string;
  public project: Proyecto;
  public status: string = '';
  public filesToUpload: Array<File> = [];
  public saveProject: Proyecto;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    // private _route: ActivatedRoute
  ) { 
    this.title = 'Editar Projecto';
    this.project = new Proyecto('','','','',2024,'', '');
    this.saveProject = new Proyecto('','','','',2024,'', '');
    this.url = Global.url; 
  }

  ngOnInit(): void {
    // this._route.params.subscribe(params => {
    //   const id:string = params['id'];
  // const id = this._route.snapshot.paramMap.get('id');
      this.getProject(this._id);
    
  }

  async getProject(id: string | null) {
    try {
      console.log('El id que llega a getProject (EDIT.COMPONENT) es: ', id);
      this._projectService.getProjectById(id).subscribe((project: Proyecto) => {
        this.project = project;
      })
    } catch (err) {
      console.log(err);
    }
 
    }

    async onSubmit(form: NgForm) {
      try {
        // Guardar los datos basicos
        const responseData = await this._projectService.saveEditProject(this.project, this._id).toPromise();
        this.saveProject = responseData;
  
        if (this.filesToUpload.length > 0) {
          // Subir la imagen
          this._uploadService.makeFileRequest(Global.url + 'upload-image/' + responseData.id, [], this.filesToUpload, 'image')
          .then((responseImage: any) => {
            this.status ='success';
          })
          .catch ((error) => {
            console.log(error);
            this.status = 'failed';
          })
        } else {
          this.status ='success';
        };
  
      } catch (error) {
        console.error(error);
        this.status = 'failed';
        // Maneja el error según tus necesidades
      }
    }
  
    fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
      }

}
