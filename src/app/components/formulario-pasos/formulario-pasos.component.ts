import { Component, ViewEncapsulation } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'app-formulario-pasos',
  imports: [
    StepperModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    DatePickerModule,
    FormsModule,
    FluidModule,
  ],
  standalone: true,
  templateUrl: './formulario-pasos.component.html',
  styleUrl: './formulario-pasos.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FormularioPasosComponent {
  date2: Date | undefined;
}
