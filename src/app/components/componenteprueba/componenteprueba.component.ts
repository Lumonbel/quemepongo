import { Component } from '@angular/core';
import { ArticuloDTO } from '../../models/articulo-dto';
import { ArticulosService } from '../../services/articulos.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componenteprueba',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './componenteprueba.component.html',
  styleUrl: './componenteprueba.component.css',
})
export class ComponentepruebaComponent {
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

  constructor(private articuloService: ArticulosService) {}

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.articuloService.findAll().subscribe((data) => {
      this.articulos = data;
      console.log(this.articulos);
    });
  }
}
