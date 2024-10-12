
import { Component } from '@angular/core';
import { OnInit, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../../services/project.service';
import { Proyecto } from '../../models/project';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Global } from '../../services/global';
import { CommonModule} from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule], // Import HttpClient
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService, HttpClient, Location] // Add ActivatedRoute to providers
})
export class DetailComponent implements OnInit {

  public project: Proyecto;
  public name: string;
  public url: string;
  public id: string;
  public deleteConfirm: boolean;
  public hasToken = signal(false); 
  public token: string | null=null;


  constructor(
    private _projectService: ProjectService,
    private _router: Router, // NO SE PUEDE USAR PORQUE BLOQUEA EL MENU, LA NAVEGACION
    private _route: ActivatedRoute,
    private location: Location
  ){
    this.name = '';
    this.id = '';
    this.project = {} as Proyecto; // Initialize as empty object
    this.url = Global.url; // Optional, if needed
    this.deleteConfirm = false;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('tokenEdition');
    if(this.token) {
      if (this.token === 'true') {
        this.hasToken.set(true);
      } else {
        this.hasToken.set(false);
      }
    }

    this._route.params.subscribe(params => {
      const name = params['name'];
      this.getProject(name);
    })
  }


  async getProject(name: string) {
    try {
      this._projectService.getProjectByName(name).subscribe((project: Proyecto) => {
        this.project = project;
      })
    } catch (err) {
      console.log(err);
    }
  }

  setConfirm(confirm: boolean) {
    this.deleteConfirm = confirm;
  }

    async deleteProject(id: string){
      try {
        console.log(id);
        this._projectService.deleteProject(id).subscribe(
          response => {
            if(response){
              this.location.back();
              this.deleteConfirm = false;
            } else {
              console.error("Error al borrar proyecto");
              // Mostrar un mensaje de error al usuario
            };
          },
          error => {
            console.error("Error al borrar proyecto:", error);      
          }
        )
      } catch (err) {
        console.log(err);
      }
    }
 }
