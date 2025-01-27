import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';

@Component({
  selector: 'app-ver-perfil-cliente',
  imports: [HeaderComponent, FooterComponent, BtAtrasComponent],
  templateUrl: './ver-perfil-cliente.component.html',
  styleUrl: './ver-perfil-cliente.component.css'
})
export class VerPerfilClienteComponent {

}
