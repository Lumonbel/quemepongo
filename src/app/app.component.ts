import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

import { HeaderComponent } from './components/header/header.component';
import { VerPerfilClienteComponent } from "./components/ver-perfil-cliente/ver-perfil-cliente.component";



@Component({
  selector: 'app-root',

  imports: [HeaderComponent, FooterComponent, RouterOutlet, VerPerfilClienteComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
 })
export class AppComponent {
  title = 'quemepongo';
}
