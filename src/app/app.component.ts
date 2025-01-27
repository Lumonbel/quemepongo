import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { VerprendaComponent } from './components/verprenda/verprenda.component';
import { DatosarticuloComponent } from "./components/datosarticulo/datosarticulo.component";
import { IndexComponent } from "./components/index/index.component";


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, VerprendaComponent, DatosarticuloComponent, IndexComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
 })
export class AppComponent {
  title = 'quemepongo';
}
