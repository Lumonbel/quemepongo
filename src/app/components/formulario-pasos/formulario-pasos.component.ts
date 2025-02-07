import { Component, ViewEncapsulation } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
    BtAtrasComponent,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './formulario-pasos.component.html',
  styleUrl: './formulario-pasos.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FormularioPasosComponent {
  formPaso1!: FormGroup;
  formPaso2!: FormGroup;
  formPaso3!: FormGroup;
  planSeleccionado: string | null = null;
  formPrincipal:FormGroup;

  constructor(private fb: FormBuilder) {
    //FG1
    this.formPaso1 = this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      repiteContraseña: ['', Validators.required]
    });

    //FG2
    this.formPaso2 = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    })

    //FG3

    this.formPaso3 = this.fb.group({
      terminos: [''],
      comunicaciones: [''],
      plan: [this.planSeleccionado]
    })
    this.formPrincipal = this.fb.group({
      form1: this.formPaso1,
      form2: this.formPaso2,
      form3: this.formPaso3
    });

  }

  seleccionarPlan(plan: string): void {
    this.planSeleccionado = plan;
    console.log(this.planSeleccionado)
  }

  verDatos() {
    this.formPaso3.patchValue({
      plan: this.planSeleccionado
    });
    console.log(this.formPrincipal.value);
  }




}
