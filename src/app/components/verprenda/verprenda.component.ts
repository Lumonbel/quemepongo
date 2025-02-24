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
  nombreUsuario: string | null = null;
  fromComponent: string | null = null;
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
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.from) {
      this.fromComponent = state.from;
    }

    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    console.warn('nombre usuario  ------>   ' + this.nombreUsuario);

    // Filtramos artículos si venimos de "InicioClienteComponent"
    if (this.fromComponent === 'InicioClienteComponent' || this.fromComponent === 'NuevoArticuloComponent') {
      this.articuloservice.findAll().subscribe((articulos: ArticuloDTO[]) => {
        let articulosFiltrados = articulos.filter(
          (articulo) => articulo.usuario?.nombreUsuario === this.nombreUsuario
        );

        this.todosArticulos = articulosFiltrados.map((articulo) => ({
          ...articulo,
          imagen: articulo.imagen
            ? this.photoService.convertImageToBase64(articulo.imagen)
            : '',
        }));

        this.indiceAleatorio(this.todosArticulos);

        // Mostrar solo los primeros 12 artículos filtrados
        this.images = this.todosArticulos.slice(0, 12);

        // El resto de artículos para cargarlos después
        this.articulosFiltrados = this.todosArticulos.slice(12);
      });
    } else {
      // Si no estamos desde "InicioClienteComponent", traemos todos los artículos
      this.articuloservice.findAll().subscribe((articulos: ArticuloDTO[]) => {
        this.todosArticulos = articulos.map((articulo) => ({
          ...articulo,
          imagen: articulo.imagen
            ? this.photoService.convertImageToBase64(articulo.imagen)
            : '',
        }));

        this.indiceAleatorio(this.todosArticulos);

        // Mostrar solo los primeros 12 artículos
        this.images = this.todosArticulos.slice(0, 12);

        // El resto de artículos para cargarlos después
        this.articulosFiltrados = this.todosArticulos.slice(12);
      });
    }

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

    // Si no hay chips seleccionados, mostramos solo los artículos del usuario
    if (this.chipsSeleccionados.length === 0) {
      let articulosDelUsuario = this.todosArticulos.filter(
        (articulo) => articulo.usuario?.nombreUsuario === this.nombreUsuario
      );
      this.images = articulosDelUsuario.slice(0, 12);
      this.articulosFiltrados = articulosDelUsuario.slice(12);
      return;
    }

    // Filtrar artículos por los tipos seleccionados y el usuario actual
    const articulosFiltrados = this.todosArticulos.filter(
      (articulo) =>
        this.chipsSeleccionados.includes(articulo.tipo) &&
        articulo.usuario?.nombreUsuario === this.nombreUsuario
    );

    // Mostrar los primeros 12 artículos filtrados
    this.images = articulosFiltrados.slice(0, 12);

    // Guardar el resto de artículos filtrados para cargar después
    this.articulosFiltrados = articulosFiltrados.slice(12);
  }

  funcSeleccionado(chip: string): boolean {
    return this.chipsSeleccionados.includes(chip);
  }

  onPrendaChange(event: any) {
    const selectedOption = this.prendasSel.find(
      (prenda) => prenda.ropa === event.value.ropa
    );

    console.log(selectedOption);

    const ropaTipoMap: { [key: string]: string[] } = {
      Complementos: [
        'Bolso',
        'Bufanda',
        'Cinturon',
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

    this.images = [];
    this.articulosFiltrados = [];

    if (selectedOption?.ropa && ropaTipoMap[selectedOption.ropa]) {
      const tipos = ropaTipoMap[selectedOption.ropa];

      let articulosTotales: ArticuloDTO[] = [];
      let tipoProcesadoCount = 0;

      tipos.forEach((tipo) => {
        this.articuloservice.findByTipo(tipo).subscribe((articulos: ArticuloDTO[]) => {
          console.log(`Artículos de tipo: ${tipo}`, articulos);

          // Filtramos los artículos por el usuario actual
          const articulosFiltradosDelUsuario = articulos.filter(
            (articulo) => articulo.usuario?.nombreUsuario === this.nombreUsuario
          );

          const articulosProcesados = articulosFiltradosDelUsuario.map((articulo) => ({
            ...articulo,
            imagen: articulo.imagen
              ? this.photoService.convertImageToBase64(articulo.imagen)
              : '',
          }));

          articulosTotales = [...articulosTotales, ...articulosProcesados];

          tipoProcesadoCount++;

          if (tipoProcesadoCount === tipos.length) {
            this.indiceAleatorio(articulosTotales);

            this.images = articulosTotales.slice(0, 12);

            this.articulosFiltrados = articulosTotales.slice(12);
          }
        });
      });

      this.mostrarDiv = selectedOption.ropa;
    } else {
      this.mostrarDiv = '';
    }
  }

  indiceAleatorio(array: any[]) {
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
    if (this.articulosFiltrados.length > 0) {
      const nextArticles = this.articulosFiltrados.slice(0, 12);

      this.images = [...this.images, ...nextArticles];

      this.articulosFiltrados = this.articulosFiltrados.slice(12);
    }
  }
}
