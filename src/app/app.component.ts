import { Component,ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { FooterComponent } from './components/footer/footer.component';
import { ComponentepruebaComponent } from "./components/componenteprueba/componenteprueba.component";
import { UsuarioComponent } from './components/usuario/usuario.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { FormularioPasosComponent } from './components/formulario-pasos/formulario-pasos.component';
import { VerprendaComponent } from './components/verprenda/verprenda.component';
import { BtAtrasComponent } from './components/bt-atras/bt-atras.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioClienteComponent } from './components/inicio-cliente/inicio-cliente.component';
import { VerPerfilClienteComponent } from "./components/ver-perfil-cliente/ver-perfil-cliente.component";

@Component({
  selector: 'app-root',
  imports: [FormularioComponent, FooterComponent, VerprendaComponent, ComponentepruebaComponent, UsuarioComponent, IndexComponent, LoginComponent, FormularioPasosComponent, RouterOutlet, BtAtrasComponent, MenuComponent, InicioClienteComponent, VerPerfilClienteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
 })
export class AppComponent {
  title = 'quemepongo';
}
