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
    'Corbata',
    'Gorra',
    'Guantes',
  ];

  chipsSeleccionados: string[] = [];

  constructor(
    private photoService: PhotoService,
    private articuloservice: ArticulosService,
    private router: Router
  ) { }

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
      this.images = this.todosArticulos.slice(0, 12);
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
      this.images = this.todosArticulos.slice(0, 12); // Mostrar solo los primeros 10
      this.articulosFiltrados = this.todosArticulos.slice(12); // El resto para cargar después
      return;
    }

    // Filtrar artículos por los tipos seleccionados
    const articulosFiltrados = this.todosArticulos.filter((articulo) =>
      this.chipsSeleccionados.includes(articulo.tipo)
    );

    // Mostrar los primeros 10 artículos filtrados
    this.images = articulosFiltrados.slice(0, 12);

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
  
    console.log(selectedOption);
  
    // Mapeo de los tipos de cada categoría (Complementos, Ropa, Zapatos)
    const ropaTipoMap: { [key: string]: string[] } = {
      Complementos: [
        'Bolso',
        'Bufanda',
        'Cinturon',  // Asegúrate de que esté escrito correctamente en el backend también.
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
        'Chaqueta',
        'Sudadera',
      ],
      Zapatos: ['Zapatos'],
    };
  
    // Reiniciar la carga de artículos
    this.images = [];
    this.articulosFiltrados = [];
  
    if (selectedOption?.ropa && ropaTipoMap[selectedOption.ropa]) {
      // Obtener todos los tipos de prendas para la categoría seleccionada
      const tipos = ropaTipoMap[selectedOption.ropa];
  
      // Array para almacenar los artículos de todas las subcategorías seleccionadas
      let articulosTotales: ArticuloDTO[] = [];
  
      // Variable para contar las subcategorías procesadas
      let tipoProcesadoCount = 0;
  
      // Llamar al servicio para obtener todos los artículos de cada tipo dentro de la categoría seleccionada
      tipos.forEach((tipo) => {
        this.articuloservice.findByTipo(tipo).subscribe((articulos: ArticuloDTO[]) => {
          console.log(`Artículos de tipo: ${tipo}`, articulos);  // Log para ver qué artículos devuelve el backend
  
          // Procesar imágenes antes de agregarlas
          const articulosProcesados = articulos.map((articulo) => ({
            ...articulo,
            imagen: articulo.imagen
              ? this.photoService.convertImageToBase64(articulo.imagen)
              : '',
          }));
  
          // Agregar los artículos procesados al array total
          articulosTotales = [...articulosTotales, ...articulosProcesados];
  
          // Incrementar el contador de subcategorías procesadas
          tipoProcesadoCount++;
  
          // Si ya se han recibido todos los artículos de las subcategorías, actualizar la lista de imágenes
          if (tipoProcesadoCount === tipos.length) {
            // Mezclar aleatoriamente los artículos (Fisher-Yates shuffle)
            this.shuffleArray(articulosTotales);
  
            // Cargar los primeros 12 artículos (si hay más)
            this.images = articulosTotales.slice(0, 12);
  
            // Guardar el resto de artículos filtrados para cargar después
            this.articulosFiltrados = articulosTotales.slice(12);
          }
        });
      });
  
      this.mostrarDiv = selectedOption.ropa;
    } else {
      this.mostrarDiv = '';
    }
  }
  
  // Función para mezclar un array de forma aleatoria (Fisher-Yates Shuffle)
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambiar los elementos
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

  cargaMasArticulos() {
    // Verificar si hay más artículos filtrados para cargar
    if (this.articulosFiltrados.length > 0) {
      // Tomar los siguientes 10 artículos filtrados
      const nextArticles = this.articulosFiltrados.slice(0, 12);

      // Agregarlos a la lista de imágenes mostradas
      this.images = [...this.images, ...nextArticles];

      // Actualizar la lista de artículos filtrados restantes
      this.articulosFiltrados = this.articulosFiltrados.slice(12);
    }
  }

}
