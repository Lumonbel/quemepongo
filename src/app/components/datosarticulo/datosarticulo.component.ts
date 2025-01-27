import { Component } from '@angular/core';
import { BtAtrasComponent } from "../bt-atras/bt-atras.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-datosarticulo',
  imports: [BtAtrasComponent, HeaderComponent,FooterComponent],
  templateUrl: './datosarticulo.component.html',
  styleUrl: './datosarticulo.component.css'
})
export class DatosarticuloComponent {

}
