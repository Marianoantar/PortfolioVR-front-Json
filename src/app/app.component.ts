import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Global } from './services/global';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-portfolio';
  // todo- Codigo para poder aditar proyectos
  codigoEdicion: string;

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('codeInputRef') codeInputRef!: ElementRef;

  constructor() {
    this.codigoEdicion = Global.codigoEdicion;
  }

  
  openDialog(){
    this.dialog.nativeElement.showModal();
  }
  
  closeDialog(){
    const codeInputValue = this.codeInputRef.nativeElement.value;
    if (codeInputValue && codeInputValue === this.codigoEdicion){
      localStorage.setItem('tokenEdition', 'true');
    } else {
      localStorage.setItem('tokenEdition', 'false');
      // alert('Código incorrecto');
    }
    this.dialog.nativeElement.close();
  }
}

