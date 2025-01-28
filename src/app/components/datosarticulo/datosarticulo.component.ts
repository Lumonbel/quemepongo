import { ArticulosService } from './../../services/articulos.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ArticuloDTO } from '../../models/articulo-dto';

@Component({
  selector: 'app-datosarticulo',
  imports: [BtAtrasComponent, HeaderComponent, FooterComponent],
  templateUrl: './datosarticulo.component.html',
  styleUrl: './datosarticulo.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DatosarticuloComponent implements OnInit {
  articulo: ArticuloDTO | null = null;

  constructor(private articulosService: ArticulosService) {}
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.articulosService.findById(1).subscribe((articulos: ArticuloDTO) => {
      this.articulo = articulos;
      console.log(articulos);
    });
  }
}
