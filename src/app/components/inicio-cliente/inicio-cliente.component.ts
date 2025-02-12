import { Component, OnInit } from '@angular/core';
import { BtAtrasComponent } from "../bt-atras/bt-atras.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-cliente',
  imports: [BtAtrasComponent],
  templateUrl: './inicio-cliente.component.html',
  styleUrl: './inicio-cliente.component.css'
})
export class InicioClienteComponent implements OnInit{
  nombreUsuario = localStorage.getItem('nombreUsuario');
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    if(this.nombreUsuario == null){
      this.router.navigate(['/index']);
    }

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

  navCesta(){
    this.router.navigate(['/carrito']);
  }
  */
  
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
    console.log("E")
  }

}
