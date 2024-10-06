import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EMPTY, tap } from 'rxjs';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgIf, NgFor, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public url: string;
  public charging:boolean = true;

  constructor (
    private _projectService: ProjectService
  ) {
    this.url =Global.url;
  };

  ngOnInit() {
    this.getProjects();
  }


  async getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        if(response){
          this.projects = response;
          this.charging = false;
          } else {
            console.error("Error al obtener proyectos");
            console.log(response)
            // Mostrar un mensaje de error al usuario
          };
      },
      error => {
       if (error.status === 404) {
          console.error("No se encontraron proyectos");
        } else if (error.status === 500) {
          console.error("Error del servidor al obtener proyectos");
        } else {
          console.error("Error desconocido al obtener proyectos:", error);
        }
  
        // Devuelva un observable vacío para evitar un procesamiento posterior
        return EMPTY      }
    );
  }


}
