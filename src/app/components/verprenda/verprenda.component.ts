import { IndexComponent } from './../index/index.component';
import { ArticulosService } from './../../services/articulos.service';
import { Component, model } from '@angular/core';
import { Chip } from 'primeng/chip';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo.service';
import { GalleriaModule } from 'primeng/galleria';
import { ArticuloDTO } from '../../models/articulo-dto';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { BtAtrasComponent } from "../bt-atras/bt-atras.component";


interface Prenda {
  ropa: string;
}

interface Image {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-verprenda',
  imports: [Chip, Select, FormsModule, CommonModule, GalleriaModule, BtAtrasComponent],
  providers: [PhotoService],
  standalone: true,
  templateUrl: './verprenda.component.html',
  styleUrl: './verprenda.component.css',
})
export class VerprendaComponent {
  prendasSel: Prenda[] = [];
  prendaSeleccionada: Prenda | undefined;
  mostrarDiv: string = '';
  todosArticulos: ArticuloDTO[] = [];

  chipsRopa: string[] = [
    'Baño',
    'Camisas',
    'Chaquetas',
    'Faldas',
    'Jerseys',
    'Pantalones',
    'Sudaderas',
    'Vestidios',
  ];
  chipsZapatos: string[] = [];
  chipsComplementos: string[] = [
    'Bolsos',
    'Bufandas',
    'Cinturones',
    'Corbatas',
    'Gorras',
    'Guantes',
  ];

  chipsSeleccionados: string[] = [];

  chipSeleccionadoFunc(chip: string) {
    const index = this.chipsSeleccionados.indexOf(chip);
    if (index > -1) {
      this.chipsSeleccionados.splice(index, 1);
    } else {
      this.chipsSeleccionados.push(chip);
    }
  }

  funcSeleccionado(chip: string): boolean {
    return this.chipsSeleccionados.includes(chip);
  }

  ngOnInit() {
    this.articuloservice.findAll().subscribe((articulos: ArticuloDTO[]) => {
      this.images = articulos;
      this.todosArticulos = articulos;
    });
    this.prendasSel = [
      { ropa: 'Complementos' },
      { ropa: 'Ropa' },
      { ropa: 'Zapatos' },
    ];
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
      this.images = this.todosArticulos.filter((articulo) =>
        ropaTipoMap[selectedOption.ropa].includes(articulo.tipo)
      );
      this.mostrarDiv = selectedOption.ropa;
    } else {
      this.mostrarDiv = '';
    }
  }


  displayCustom: boolean = false;

  activeIndex: number = 0;

  images: ArticuloDTO[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private photoService: PhotoService,
    private articuloservice: ArticulosService,
    private router: Router
  ) {}

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
}
