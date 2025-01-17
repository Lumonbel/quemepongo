import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verprenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verprenda.component.html',
  styleUrl: './verprenda.component.css',
})
export class VerprendaComponent {
  filtros: string[] = [
    'Vestidos',
    'Blusas',
    'Pantalones',
    'Faldas',
    'Zapatos',
    'Accesorios',
  ];
  productos = [
    { nombre: 'Vestido Azul', imagen: 'assets/vestido-azul.jpg' },
    { nombre: 'Blusa Blanca', imagen: 'assets/blusa-blanca.jpg' },
    { nombre: 'Camiseta Roja', imagen: 'assets/camiseta-roja.jpg' },
    { nombre: 'Camisa Casual', imagen: 'assets/camisa-casual.jpg' },
    { nombre: 'Zapatos Beige', imagen: 'assets/zapatos-beige.jpg' },
    { nombre: 'Sudadera Amarilla', imagen: 'assets/sudadera-amarilla.jpg' },
  ];
}
