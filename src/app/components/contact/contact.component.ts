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
  public miLinkedin: string;

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

  linkedin = {
    contenido: `${Global.linkedin}`,
    desde: 'izquierda',
    icono: 'assets/img/linkedin.png',
    titulo: 'Linkedin'
  }
  
  constructor() {
    this.miWhatsapp = Global.whatsapp;
    this.miMail = Global.mail;
    this.miLinkedin = Global.linkedin;
   }

  whatsappLink() {
    // return `https://wa.me/${this.miWhatsapp}`;
    const url = `https://wa.me/${this.miWhatsapp}`;
    window.open(url, '_blank');
  }

  mailLink() {
    const subject = 'Asunto del correo';
    const url = `mailto:${this.miMail}?subject=${encodeURIComponent(subject)}`;
    window.open(url, '_blank');
  }

  linkedinLink() {
    const url = `http://${this.miLinkedin}`;
    window.open(url, '_blank');
  }

}
