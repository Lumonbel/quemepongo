import { FormularioComponent } from './../formulario/formulario.component';
import { PhotoService } from './../../services/photo.service';
import { ArticulosService } from './../../services/articulos.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { ArticuloDTO } from '../../models/articulo-dto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioDTO } from '../../models/usuario-dto';
import { SesionService } from '../../services/sesion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-datosarticulo',
  imports: [BtAtrasComponent, CommonModule],
  templateUrl: './datosarticulo.component.html',
  styleUrls: ['./datosarticulo.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DatosarticuloComponent implements OnInit {
  articulo: ArticuloDTO | null = null;
  esUsuario: boolean = false;
  usuario: UsuarioDTO | null = null;
  nombreUsuario: string | null = null;
  private subscription: Subscription = new Subscription();
  fromComponent: string | null = null;

  constructor(
    private articulosService: ArticulosService,
    private router: Router,
    private sesionService: SesionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
     const state = history.state;
     if (state && state.from) {
       this.fromComponent = state.from;
     }

    console.log('Usuario logueado:', this.usuario); // Depuración

    this.subscription = this.articulosService.art$.subscribe(
      (art: ArticuloDTO) => {
        this.articulo = art;
        console.log('Artículo recibido:', this.articulo); // Depuración
        this.verificarPropiedad();
        this.cdr.detectChanges(); // Forzar actualización de la vista
      },
      (error) => {
        console.error('Error al obtener el artículo:', error);
      }
    );
  }

  verificarPropiedad(): void {
    if (this.articulo && this.usuario && this.fromComponent === 'VerPrendaComponent') {
      this.esUsuario =
        this.articulo.usuario?.nombreUsuario === this.usuario.nombreUsuario;
      console.log('¿Es el usuario dueño del artículo?:', this.esUsuario); // Depuración
    }
  }

  editarArticulo(id?: number): void {
    if (id) {
      this.articulosService.setId(id);
      this.router.navigate(['/actualizarArticulo']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Limpiar suscripción para evitar fugas de memoria
  }
}
