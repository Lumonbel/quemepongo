import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';

@Component({
  selector: 'app-actualizar-articulo',
  imports: [HeaderComponent, FooterComponent,BtAtrasComponent],
  templateUrl: './actualizar-articulo.component.html',
  styleUrl: './actualizar-articulo.component.css'
})
export class ActualizarArticuloComponent {

}
