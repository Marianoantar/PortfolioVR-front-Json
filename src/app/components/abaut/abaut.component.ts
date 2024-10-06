import { Component } from '@angular/core';

@Component({
  selector: 'app-abaut',
  standalone: true,
  imports: [],
  templateUrl: './abaut.component.html',
  styleUrl: './abaut.component.css'
})
export class AbautComponent {
  public title:string;
  public subtitle:string;
  public email:string;

  constructor() {
    this.title = "Mariano Antar";
    this.subtitle = "Desarrollador Web";
    this.email = "marianoantar@gmail.com";
  }

}
