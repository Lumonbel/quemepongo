import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BtAtrasComponent } from './components/bt-atras/bt-atras.component';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet,BtAtrasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
 })
export class AppComponent {
  title = 'quemepongo';
}
