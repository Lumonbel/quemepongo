import { Component } from '@angular/core';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cesta',
  imports: [BtAtrasComponent],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent {

  constructor(
    private router: Router
    ) { }

  rediriguirCompras(){
    this.router.navigate(['/verprenda']);
  }

}
