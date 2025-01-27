import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bt-atras',
  imports: [],
  templateUrl: './bt-atras.component.html',
  styleUrl: './bt-atras.component.css'
})
export class BtAtrasComponent {
  constructor(private location: Location){} //autowired
  volver():void{
    this.location.back();
  }

}

