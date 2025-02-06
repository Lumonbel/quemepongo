import { ArticulosService } from './articulos.service';
import { Injectable } from '@angular/core';
import { ArticuloDTO } from '../models/articulo-dto';

@Injectable()
export class PhotoService {
  getData(articulosMostrar: ArticuloDTO[]) {
    return articulosMostrar;
    //[
    //   {
    //     itemImageSrc: 'assets/images/camiseta.png',
    //     thumbnailImageSrc: 'assets/images/camiseta.png ',
    //     alt: 'Imagen 1',
    //     title: 'Prueba 1'
    //   },
    //   {
    //     itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
    //     thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
    //     alt: 'Imagen 2',
    //     title: 'Prueba 2'
    //   },
    // ];
  }
  constructor(private articulosService: ArticulosService) {
    this.articulosService.findAll().subscribe((articulos) => {
      this.articulos = articulos;
    });
  }

  articulos: ArticuloDTO[] = [];

  getImages() {
    return Promise.resolve(this.getData(this.articulos));
  }
}
