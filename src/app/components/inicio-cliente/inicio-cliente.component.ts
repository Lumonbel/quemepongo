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

  }
  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/index']);
  }

}
