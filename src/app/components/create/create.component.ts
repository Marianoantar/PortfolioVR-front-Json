import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService, HttpClient, UploadService]
})
export class CreateComponent implements OnInit{

  public title: string;
  public project: Project;
  public status: string = '';
  public filesToUpload: Array<File> = [];
  public saveProject: Project;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title = 'Crear Projector';
    this.project = new Project('','','',2024,'', '');
    this.saveProject = new Project('','','',2024,'', '');
    this.url =Global.url;
  };

  ngOnInit(): void {
    
  }


  async onSubmit(form: NgForm) {
    try {
      // Guardar los datos basicos
      const responseData = await this._projectService.saveProject(this.project).toPromise();
      this.saveProject = responseData;

      if (this.filesToUpload.length > 0) {
        // Subir la imagen
        this._uploadService.makeFileRequest(Global.url + 'upload-image/' + responseData.id, [], this.filesToUpload, 'image')
        .then((responseImage: any) => {
          this.status ='success';
          form.reset();
        })
        .catch ((error) => {
          console.log(error);
          this.status = 'failed';
        })
      } else {
        this.status ='success';
        form.reset();
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
