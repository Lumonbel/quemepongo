import { IndexComponent } from './../index/index.component';
import { ArticulosService } from './../../services/articulos.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chip } from 'primeng/chip';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo.service';
import { GalleriaModule } from 'primeng/galleria';
import { ArticuloDTO } from '../../models/articulo-dto';
import { Router } from '@angular/router';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';

interface Prenda {
  ropa: string;
}

@Component({
  selector: 'app-verprenda',
  imports: [Chip, Select, FormsModule, CommonModule, GalleriaModule],
  providers: [PhotoService],
  standalone: true,
  templateUrl: './verprenda.component.html',
  styleUrls: ['./verprenda.component.css'],
})
export class VerprendaComponent {
  prendasSel: Prenda[] = [];
  prendaSeleccionada: Prenda | undefined;
  mostrarDiv: string = '';
  todosArticulos: ArticuloDTO[] = [];
  images: ArticuloDTO[] = [];
  @ViewChild('endOfList') endOfList!: ElementRef;

  displayCustom: boolean = false;
  activeIndex: number = 0;

  responsiveOptions: any[] = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  chipsRopa: string[] = [
    'Baño',
    'Camisa',
    'Chaqueta',
    'Falda',
    'Jersey',
    'Pantalon',
    'Sudadera',
    'Vestido',
  ];
  chipsZapatos: string[] = [];
  chipsComplementos: string[] = [
    'Bolso',
    'Bufandas',
    'Cinturon',
    'Corbatas',
    'Gorras',
    'Guantes',
  ];

  chipsSeleccionados: string[] = [];

  constructor(
    private photoService: PhotoService,
    private articuloservice: ArticulosService,
    private router: Router
  ) {}

  // In verprenda.component.ts
  ngOnInit() {
    this.articuloservice.findAll().subscribe((articulos: ArticuloDTO[]) => {
      // Procesar imágenes antes de asignarlas
      this.todosArticulos = articulos.map((articulo) => ({
        ...articulo,
        imagen: articulo.imagen
          ? this.photoService.convertImageToBase64(articulo.imagen)
          : '',
      }));

      // Cargar solo los primeros 10 artículos
      this.images = this.todosArticulos.slice(0, 10);
    });

    this.prendasSel = [
      { ropa: 'Complementos' },
      { ropa: 'Ropa' },
      { ropa: 'Zapatos' },
    ];
  }

  chipSeleccionadoFunc(chip: string) {
    const index = this.chipsSeleccionados.indexOf(chip);
    if (index > -1) {
      this.chipsSeleccionados.splice(index, 1);
    } else {
      this.chipsSeleccionados.push(chip);
    }

    // Filtrar artículos por tipo seleccionado
    this.articuloservice.findByTipo(chip).subscribe((response) => {
      // Procesar los artículos para convertir las imágenes a base64
      const articulosProcesados = response.map((articulo: { imagen: string; }) => ({
        ...articulo,
        imagen: articulo.imagen
          ? this.photoService.convertImageToBase64(articulo.imagen)
          : '',
      }));
      // Actualizar las imágenes con los artículos filtrados
      this.images = articulosProcesados;
      console.log(response);
    });
  }

  funcSeleccionado(chip: string): boolean {
    return this.chipsSeleccionados.includes(chip);
  }

  onPrendaChange(event: any) {
    const selectedOption = this.prendasSel.find(
      (prenda) => prenda.ropa === event.value.ropa
    );

    const ropaTipoMap: { [key: string]: string[] } = {
      Complementos: [
        'AccesorioAlmacenamiento',
        'Bufanda',
        'Cinturones',
        'Corbatas',
        'Gorra',
        'Guantes',
      ],
      Ropa: [
        'Camisa',
        'Baño',
        'Jersey',
        'Pantalon',
        'Falda',
        'Vestido',
        'Chaquetas',
        'Sudaderas',
        'Vestidos',
      ],
      Zapatos: ['Zapatos'],
    };

    if (selectedOption?.ropa && ropaTipoMap[selectedOption.ropa]) {
      // Obtener los tipos de prendas para la categoría seleccionada
      const tipos = ropaTipoMap[selectedOption.ropa];

      // Limpiar la lista de imágenes actual
      this.images = [];

      // Llamar al servicio para cada tipo de prenda
      tipos.forEach((tipo) => {
        this.articuloservice.findByTipo(tipo).subscribe((articulos: ArticuloDTO[]) => {
          // Procesar imágenes antes de agregarlas
          const articulosProcesados = articulos.map((articulo) => ({
            ...articulo,
            imagen: articulo.imagen
              ? this.photoService.convertImageToBase64(articulo.imagen)
              : '',
          }));

          // Agregar los artículos procesados a la lista de imágenes
          this.images = [...this.images, ...articulosProcesados];
        });
      });

      this.mostrarDiv = selectedOption.ropa;
    } else {
      this.mostrarDiv = '';
    }
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  onImagesChange(newImages: ArticuloDTO[]) {
    this.images = newImages;
  }

  envioArticulo(articuloPasar: ArticuloDTO) {
    this.articuloservice.pasoArticulo(articuloPasar);
    this.router.navigate(['/infoarticulo']);
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.cargaMasArticulos();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(this.endOfList.nativeElement);
  }

  getGroupedImages(): any[][] {
    const groupSize = 6;
    const groupedImages = [];
    for (let i = 0; i < this.images.length; i += groupSize) {
      groupedImages.push(this.images.slice(i, i + groupSize));
    }
    return groupedImages;
  }

  cargaMasArticulos() {
    const currentLength = this.images.length;
    const nextArticles = this.todosArticulos.slice(
      currentLength,
      currentLength + 10
    );
    this.images = [...this.images, ...nextArticles];
  }
}
