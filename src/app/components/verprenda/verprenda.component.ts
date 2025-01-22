import { Component } from '@angular/core';
import { Chip } from 'primeng/chip';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';

interface Prenda {
  ropa: string;
}

@Component({
  selector: 'app-verprenda',
  imports: [Chip, Select, FormsModule],
  standalone: true,
  templateUrl: './verprenda.component.html',
  styleUrl: './verprenda.component.css'
})
export class VerprendaComponent {
  prendasSel: Prenda[] | undefined;

  prendaSeleccionada: Prenda | undefined;
  
  ngOnInit() {
    this.prendasSel = [
      { ropa: 'Ropa' },
      { ropa: 'Zapatos' },
      { ropa: 'Complementos' },
    ];
  }



  onPrendaChange(event: any) {
    this.prendaSeleccionada = event.value;
    console.log(this.prendaSeleccionada);
  }    
}
