import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BtAtrasComponent } from "../bt-atras/bt-atras.component";

@Component({
  selector: 'app-inicio-cliente',
  imports: [HeaderComponent, FooterComponent, BtAtrasComponent],
  templateUrl: './inicio-cliente.component.html',
  styleUrl: './inicio-cliente.component.css'
})
export class InicioClienteComponent {

}
