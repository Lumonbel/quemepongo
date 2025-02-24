import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ArticulosService } from '../../services/articulos.service';
import { ArticuloDTO } from '../../models/articulo-dto';

@Component({
  selector: 'app-inicio-cliente',
  imports: [ CommonModule],
  templateUrl: './inicio-cliente.component.html',
  styleUrl: './inicio-cliente.component.css'
})
export class InicioClienteComponent implements OnInit{
  nombreUsuario = localStorage.getItem('nombreUsuario');
  articulos: ArticuloDTO[] = [];
  constructor(
    private router: Router,
    private articuloService: ArticulosService,
  ) { }
  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    if(this.nombreUsuario == null){
      this.router.navigate(['/index']);
    }
    this.cargarArticulos();

  }

  /* 

  Preparado para cuando hagamos el resto, para redirigir todo

  navNuevoArticulo(){
    this.router.navigate(['/nuevoArticulo']);
  }

  navArticulosEnVenta(){
    this.router.navigate(['/articulosEnVenta']);
  }

  navMiArmario(){
    this.router.navigate(['/miArmario']);
  }
*/
  navCesta(){
    this.router.navigate(['/cesta']);
  }
  
  
  navPerfilCliente(){
    this.router.navigate(['/verMiPerfil']);
  }
  
  /*
  navEditarPerfil(){
    this.router.navigate(['/editarPerfilCliente']);
  }

  */

  editarPassword(){
    this.router.navigate(['/editarPassword']);
  }

  cerrarSesion(){
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/index']);
  }

  nuevoArticulo(){
    this.router.navigate(['/nuevoArticulo']);
  }

  cargarArticulos():void{
    if(this.nombreUsuario){
      this.articuloService.findByNombreUsuario(this.nombreUsuario).subscribe({
        next: (a) => {
          let articulosTranformados: ArticuloDTO[] = [];
          a.forEach(art =>{
            art.imagen='data:image/png;base64,' + art.imagen;
            articulosTranformados.push(art);
          })
          this.articulos = this.mezclarArray(articulosTranformados);
        }
      })
    }
  }

  mezclarArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  }
}
