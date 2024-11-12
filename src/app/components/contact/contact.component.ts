import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Global } from '../../services/global';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  public miWhatsapp: string;
  public miMail: string;

    whatsapp = {
    contenido: `${Global.whatsapp}`,
    desde: 'izquierda',
    icono: 'assets/img/whatsapp.png',
    titulo: 'Whatsapp'
  };

  mail = {
    contenido: `${Global.mail}`, 
    desde: 'derecha', 
    icono: 'assets/img/gmail1.png',
    titulo: 'Correo electrónico'
  }
  
  constructor() {
    this.miWhatsapp = Global.whatsapp;
    this.miMail = Global.mail;
   }

  whatsappLink() {
    // return `https://wa.me/${this.miWhatsapp}`;
    const url = `https://wa.me/${this.miWhatsapp}`;
    window.open(url, '_blank');
  }

  mailLink() {
    // return `mailto:${this.miMail}`;
    const subject = 'Asunto del correo';
    const url = `mailto:${this.miMail}?subject=${encodeURIComponent(subject)}`;
    window.open(url, '_blank');
  }

}
