import { Routes } from '@angular/router';
import { FormularioPasosComponent } from './components/formulario-pasos/formulario-pasos.component';
import { IndexComponent } from './components/index/index.component';
import { InicioClienteComponent } from './components/inicio-cliente/inicio-cliente.component';
import { DatosarticuloComponent } from './components/datosarticulo/datosarticulo.component';
import { VerprendaComponent } from './components/verprenda/verprenda.component';
import { LoginComponent } from './components/login/login.component';
import { ActualizarArticuloComponent } from './components/actualizar-articulo/actualizar-articulo.component';
import { ActArtP2Component } from './components/act-art-p2/act-art-p2.component';
import { VerPerfilClienteComponent } from './components/ver-perfil-cliente/ver-perfil-cliente.component';
import { NuevoArticuloComponent } from './components/nuevo-articulo/nuevo-articulo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'registroPasos', component: FormularioPasosComponent },
  { path: 'index', component: IndexComponent },
  { path: 'perfilCliente', component: InicioClienteComponent },
  { path: 'infoarticulo', component: DatosarticuloComponent },
  { path:  'verprenda', component: VerprendaComponent},
  { path: 'login', component: LoginComponent },
  { path: 'verPerfilCliente', component: VerPerfilClienteComponent}
  { path: 'actualizarArticulo', component: ActArtP2Component},
  { path: 'nuevoArticulo', component: NuevoArticuloComponent},
];
