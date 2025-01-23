import { Component } from '@angular/core';
import { Chip } from 'primeng/chip';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Prenda {
  ropa: string;
}

@Component({
  selector: 'app-verprenda',
  imports: [Chip, Select, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './verprenda.component.html',
  styleUrl: './verprenda.component.css'
})
export class VerprendaComponent {
  prendasSel: Prenda[] = [];
  prendaSeleccionada: Prenda | undefined;
  mostrarDiv: string = '';

  chipsRopa: string[] = ["Pantalones", "Camisas", "Chaquetas", "Sudaderas", "Faldas", "Jerseys","Vestidos","Baño"];
  chipsZapatos: string[] = [];
  chipsComplementos: string[] = ["Cinturones", "Corbatas", "Gorras", "Bufandas", "Guantes"];

  chipsSeleccionados: string[] = [];

  chipSeleccionadoFunc(chip: string) {
    const index = this.chipsSeleccionados.indexOf(chip);
    if (index > -1) {
      this.chipsSeleccionados.splice(index, 1);
    } else {
      this.chipsSeleccionados.push(chip);
    }
  }

  funcSeleccionado(chip: string): boolean {
    return this.chipsSeleccionados.includes(chip);
  }

  ngOnInit() {
    this.prendasSel = [
      { ropa: 'Ropa' },
      { ropa: 'Zapatos' },
      { ropa: 'Complementos' },
    ];
  }

  onPrendaChange(event: any) {
    const selectedOption = this.prendasSel.find(prenda => prenda.ropa === event.value.ropa);
    console.log('Opción seleccionada:', selectedOption);

    if (selectedOption) {
      this.mostrarDiv = selectedOption.ropa;
    } else {
      this.mostrarDiv = '';
    }
  }
}