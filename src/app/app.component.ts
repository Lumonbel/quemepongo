import { Component,ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { FooterComponent } from './components/footer/footer.component';
import { VerprendaComponent } from "./components/verprenda/verprenda.component";
import { ComponentepruebaComponent } from "./components/componenteprueba/componenteprueba.component";
import { UsuarioComponent } from './components/usuario/usuario.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { FormularioPasosComponent } from './components/formulario-pasos/formulario-pasos.component';
import { BtAtrasComponent } from './components/bt-atras/bt-atras.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [FormularioComponent, FooterComponent, VerprendaComponent, ComponentepruebaComponent, UsuarioComponent, IndexComponent, LoginComponent, FormularioPasosComponent, RouterOutlet, BtAtrasComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
 })
export class AppComponent {
  title = 'quemepongo';
}
