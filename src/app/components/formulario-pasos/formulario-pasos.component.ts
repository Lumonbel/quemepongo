import { Component, ViewEncapsulation } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { BtAtrasComponent } from "../bt-atras/bt-atras.component";

@Component({
  selector: 'app-formulario-pasos',
  imports: [
    StepperModule,
    ButtonModule,

    DatePickerModule,
    FormsModule,
    FluidModule,
    BtAtrasComponent
],
  standalone: true,
  templateUrl: './formulario-pasos.component.html',
  styleUrl: './formulario-pasos.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FormularioPasosComponent {
}
