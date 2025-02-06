import { Routes } from '@angular/router';
import { FormularioPasosComponent } from './components/formulario-pasos/formulario-pasos.component';
import { IndexComponent } from './components/index/index.component';
import { InicioClienteComponent } from './components/inicio-cliente/inicio-cliente.component';
import { DatosarticuloComponent } from './components/datosarticulo/datosarticulo.component';
import { VerprendaComponent } from './components/verprenda/verprenda.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'registroPasos', component: FormularioPasosComponent },
  { path: 'index', component: IndexComponent },
  { path: 'perfilCliente', component: InicioClienteComponent },
  { path: 'infoarticulo', component: DatosarticuloComponent },
  { path: 'formulario', component: FormularioComponent },
  {path:'verprenda', component: VerprendaComponent}
  { path: 'login', component: LoginComponent },


];
