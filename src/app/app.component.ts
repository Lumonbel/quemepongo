import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { FooterComponent } from './components/footer/footer.component';
import { VerprendaComponent } from "./components/verprenda/verprenda.component";
import { ComponentepruebaComponent } from "./components/componenteprueba/componenteprueba.component";
import { UsuarioComponent } from './components/usuario/usuario.component';

@Component({
  selector: 'app-root',
  imports: [FormularioComponent, FooterComponent, VerprendaComponent, ComponentepruebaComponent, UsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quemepongo';
}
