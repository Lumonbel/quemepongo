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
  imports: [
    Chip,
    Select,
    FormsModule,
    CommonModule,
    GalleriaModule,
    BtAtrasComponent,
  ],
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
  articulosFiltrados: ArticuloDTO[] = [];

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
    'Bufanda',
    'Cinturon',
    'Corbatas',
    'Gorra',
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
    if (this.chipsSeleccionados.includes(chip)) {
      // Si el chip ya está seleccionado, lo quitamos
      this.chipsSeleccionados = this.chipsSeleccionados.filter(
        (c) => c !== chip
      );
    } else {
      // Si el chip no está seleccionado, lo agregamos
      this.chipsSeleccionados.push(chip);
    }

    // Reiniciar la carga de artículos
    this.images = [];
    this.articulosFiltrados = [];

    // Si no hay chips seleccionados, mostramos todos los artículos
    if (this.chipsSeleccionados.length === 0) {
      this.images = this.todosArticulos.slice(0, 10); // Mostrar solo los primeros 10
      this.articulosFiltrados = this.todosArticulos.slice(10); // El resto para cargar después
      return;
    }

    // Filtrar artículos por los tipos seleccionados
    const articulosFiltrados = this.todosArticulos.filter((articulo) =>
      this.chipsSeleccionados.includes(articulo.tipo)
    );

    // Mostrar los primeros 10 artículos filtrados
    this.images = articulosFiltrados.slice(0, 10);

    // Guardar el resto de artículos filtrados para cargar después
    this.articulosFiltrados = articulosFiltrados.slice(10);
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

    // Reiniciar la carga de artículos
    this.images = [];
    this.articulosFiltrados = [];

    if (selectedOption?.ropa && ropaTipoMap[selectedOption.ropa]) {
      // Obtener los tipos de prendas para la categoría seleccionada
      const tipos = ropaTipoMap[selectedOption.ropa];

      // Llamar al servicio para cada tipo de prenda
      tipos.forEach((tipo) => {
        this.articuloservice
          .findByTipo(tipo)
          .subscribe((articulos: ArticuloDTO[]) => {
            // Procesar imágenes antes de agregarlas
            const articulosProcesados = articulos.map((articulo) => ({
              ...articulo,
              imagen: articulo.imagen
                ? this.photoService.convertImageToBase64(articulo.imagen)
                : '',
            }));

            // Agregar los artículos procesados a la lista de artículos filtrados
            this.articulosFiltrados = [
              ...this.articulosFiltrados,
              ...articulosProcesados,
            ];

            // Mostrar los primeros 10 artículos filtrados
            this.images = this.articulosFiltrados.slice(0, 10);

            // Guardar el resto de artículos filtrados para cargar después
            this.articulosFiltrados = this.articulosFiltrados.slice(10);
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
    // Verificar si hay más artículos filtrados para cargar
    if (this.articulosFiltrados.length > 0) {
      // Tomar los siguientes 10 artículos filtrados
      const nextArticles = this.articulosFiltrados.slice(0, 10);

      // Agregarlos a la lista de imágenes mostradas
      this.images = [...this.images, ...nextArticles];

      // Actualizar la lista de artículos filtrados restantes
      this.articulosFiltrados = this.articulosFiltrados.slice(10);
    }
  }

  editarArticulo(id?: number) {
    this.articuloservice.setId(id!);
    this.router.navigate(['/actualizarArticulo']);
  }
}
