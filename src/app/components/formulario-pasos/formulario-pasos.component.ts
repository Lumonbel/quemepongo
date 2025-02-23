import { Component, ViewEncapsulation } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDTO } from '../../models/usuario-dto';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alerts.service';

@Component({
  selector: 'app-formulario-pasos',
  imports: [
    StepperModule,
    ButtonModule,
    DatePickerModule,
    FormsModule,
    FluidModule,
    BtAtrasComponent,
    ReactiveFormsModule,
    CommonModule,
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
  nuevoUsuario?: UsuarioDTO;
  pasoActual: number = 1;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private alertService: AlertService
  ) {
    //FG1
    this.formPaso1 = this.fb.group({
      nombreUsuario: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 ]{2,20}$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      contraseña: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{5,10}$/),
        ],
      ],
      repiteContraseña: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{5,10}$/),
        ],
      ],
    });

    //FG2
    this.formPaso2 = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 ]{2,20}$/),
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 ]{2,20}$/),
        ],
      ],
      fechaNacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    });

    //FG3

    this.formPaso3 = this.fb.group({
      terminos: [false, [Validators.requiredTrue]],
      comunicaciones: [false],
      plan: [this.planSeleccionado],
    });
  }

  seleccionarPlan(plan: string): void {
    this.planSeleccionado = plan;
  }

  verDatos() {
    this.formPaso3.patchValue({
      plan: this.planSeleccionado,
    });

    this.nuevoUsuario = {
      nombre: this.formPaso2.value.nombre,
      apellidos: this.formPaso2.value.apellidos,
      nombreUsuario: this.formPaso1.value.nombreUsuario,
      email: this.formPaso1.value.email,
      fechaNacimiento: this.formPaso2.value.fechaNacimiento,
      password: this.formPaso1.value.contraseña,
      telefono: this.formPaso2.value.telefono,
      activo: true,
      plan: this.formPaso3.value.plan,
      rol: 'Cliente',
    };

    this.usuarioService
      .anyadirUsuario(this.nuevoUsuario)
      .subscribe((response) => {
        if (response) {
          this.alertService.success('Éxito', 'Usuario creado correctamente.');
          this.router.navigate(['/login']);
        }
        else {
          this.alertService.error('Error', 'Error al crear el usuario.');
          this.router.navigate(['/registroPasos']);
        }
      });
  }

  mostrarError(
    formGroup: FormGroup,
    controlName: string,
    errorName: string
  ): boolean {
    const control = formGroup.get(controlName);
    return control!.hasError(errorName) && control!.touched;
  }
  avanzarPaso(form: FormGroup, siguientePaso: number) {
    if (form.valid) {
      this.pasoActual = siguientePaso;
    } else {
      this.alertService.error('Error', 'Por favor, completa todos los campos.');
      form.markAllAsTouched();
    }
  }

  retrocederPaso(anteriorPaso: number) {
    this.pasoActual = anteriorPaso;
  }
}
