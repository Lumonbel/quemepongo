import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticulosService } from '../../services/articulos.service';
import { CommonModule } from '@angular/common';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';


@Component({
  selector: 'app-act-art-p2',
  standalone: true,
  imports: [FormsModule, CommonModule, BtAtrasComponent],
  templateUrl: './act-art-p2.component.html',
  styleUrl: './act-art-p2.component.css'
})
export class ActArtP2Component implements OnInit {
  articulo: any = {};
  categorias = [
    {
      nombre: 'Complementos',
      subcategorias: ['Bolso', 'Bufanda', 'Cinturón', 'Corbata', 'Gorro', 'Guantes']
    },
    {
      nombre: 'Ropa',
      subcategorias: ['Camisa','Chaqueta', 'Falda','Jersey' ,'Pantalon', 'Ropa de baño' ,'Sudadera' ,'Vestido']
    },
    {
      nombre: 'Zapatos',
      subcategorias: []
    }
  ];
  constructor(
      private articuloService: ArticulosService
    ) {}

  categoriaSeleccionada: string = '';
  subcategoriaSeleccionada: string = '';
  subcategoriasFiltradas: string[] = [];

  ngOnInit() {
    this.articuloService.findById(1).subscribe({
      next: (data) => {
        this.articulo = data;
        console.log(this.articulo);
        // Datos recibidos de la base de datos
        this.subcategoriaSeleccionada = this.articulo.tipo;

        // Encontrar y establecer la categoría correspondiente
        for (let categoria of this.categorias) {
          if (categoria.subcategorias.includes(this.subcategoriaSeleccionada)) {
            this.categoriaSeleccionada = categoria.nombre;
            break;
          }
        }

        // Cargar subcategorías correspondientes
        this.actualizarSubcategorias();
      },
      error: (err) => {
        console.error('Error al cargar el artículo:', err);
      },
    });
    console.log(this.articulo);
    
  }

  actualizarSubcategorias() {
    const categoria = this.categorias.find(cat => cat.nombre === this.categoriaSeleccionada);
    this.subcategoriasFiltradas = categoria ? categoria.subcategorias : [];
  }

  actualizarCategoria() {
    console.log('Actualizando producto:', this.articulo);
    this.articulo.tipo = this.subcategoriaSeleccionada;
    this.articuloService.updateArticulo(this.articulo).subscribe({
      next: (response) => {
        console.log('Producto actualizado:', response);
        alert('Producto actualizado correctamente');
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
      },
    });
  }

  
}
