import { Component } from '@angular/core';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { BtRopaComponent } from "../bt-ropa/bt-ropa.component";

@Component({
  selector: 'app-nuevo-articulo',
  imports: [BtAtrasComponent, BtRopaComponent],
  templateUrl: './nuevo-articulo.component.html',
  styleUrl: './nuevo-articulo.component.css'
})
export class NuevoArticuloComponent {

}
