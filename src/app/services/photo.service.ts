import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
  getData() {
    return [
      {
        itemImageSrc: 'assets/images/camiseta.png',
        thumbnailImageSrc: 'assets/images/camiseta.png ',
        alt: 'Imagen 1',
        title: 'Prueba 1'
      },
      {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
        alt: 'Imagen 2',
        title: 'Prueba 2'
      },
    ];
  }

  getImages() {
    return Promise.resolve(this.getData());
  }
};