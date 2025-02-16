import { PhotoService } from './../../services/photo.service';
import { ArticulosService } from './../../services/articulos.service';
import {
  Component,
  Input,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ArticuloDTO } from '../../models/articulo-dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-datosarticulo',
  imports: [BtAtrasComponent, HeaderComponent, FooterComponent],
  templateUrl: './datosarticulo.component.html',
  styleUrl: './datosarticulo.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DatosarticuloComponent implements OnInit {
  articulo: ArticuloDTO | null = null;
  artVer!: ArticuloDTO;
  private subscription: Subscription = new Subscription();

  constructor(
    private articulosService: ArticulosService,
    private photoService: PhotoService
  ) {}
  ngOnInit(): void {
    this.subscription = this.articulosService.art$.subscribe(
      (art: ArticuloDTO) => {
        this.artVer = art;
      }
    );
    this.cargarDatos();

    console.log(this.artVer);
  }

  cargarDatos() {
    this.articulosService
      .findById(this.artVer.id!)
      .subscribe((articulos: ArticuloDTO) => {
        this.articulo = articulos;
        if (this.articulo) {
          this.articulo.imagen = this.photoService.convertImageToBase64(
            articulos.imagen
          );
        }
      });
  }
}
