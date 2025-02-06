import { Routes } from '@angular/router';
import { FormularioPasosComponent } from './components/formulario-pasos/formulario-pasos.component';
import { IndexComponent } from './components/index/index.component';
import { InicioClienteComponent } from './components/inicio-cliente/inicio-cliente.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'registroPasos', component: FormularioPasosComponent },
  { path: 'index', component: IndexComponent },
  { path: 'perfilCliente', component: InicioClienteComponent },
  { path: 'login', component: LoginComponent },


];
