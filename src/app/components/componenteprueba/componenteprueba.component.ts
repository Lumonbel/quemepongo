import { Direccion } from './../../models/transaccion-dto';
import { Component } from '@angular/core';
import { ArticuloDTO } from '../../models/articulo-dto';
import { ArticulosService } from '../../services/articulos.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Transaccion } from '../../models/transaccion-dto';

@Component({
  selector: 'app-componenteprueba',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './componenteprueba.component.html',
  styleUrl: './componenteprueba.component.css',
})
export class ComponentepruebaComponent {
    direccion: Direccion | undefined;
  articulos: ArticuloDTO[] = [];
  nuevoArticulo: ArticuloDTO = {
    color: '',
    marca: '',
    material: '',
    temporada: '',
    imagen: '',
    estado: '',
    publicado: false,
    descripcion: '',
    tipo: '',
    genero: '',
    activo: true,
    talla: '',
    largo: '',
    grosor: '',
    capacidad: '',
    tipoAlmacenamiento: '',
    estampado: '',
  };

  ts: Transaccion[] = [];
 

  constructor(private articuloService: ArticulosService) {}

  ngOnInit(): void {
    this.cargarArticulos();
        this.cargarT();


  }

  cargarArticulos(): void {
    this.articuloService.findAll().subscribe((data) => {
      this.articulos = data;
      console.log(this.articulos);
    });
  }

  cargarT(): void {
    this.articuloService.findAllT().subscribe((data) => {
      this.ts = data;
      console.log(this.ts);
    });
  }
}
