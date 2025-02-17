import { Component, ViewEncapsulation } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { BtAtrasComponent } from "../bt-atras/bt-atras.component";
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDTO } from '../../models/usuario-dto';
import { Router } from '@angular/router';

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
  nuevoUsuario?: UsuarioDTO;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
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
      terminos: [false],
      comunicaciones: [false],
      plan: [this.planSeleccionado]
    })

  }

  seleccionarPlan(plan: string): void {
    this.planSeleccionado = plan;
    console.log(this.planSeleccionado)
  }

  verDatos() {
    this.formPaso3.patchValue({
      plan: this.planSeleccionado
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
      rol: 'Cliente'
    }
    console.table(this.nuevoUsuario)
    this.usuarioService.anyadirUsuario(this.nuevoUsuario).subscribe(response => {
      console.log('Usuario creado', response);
      alert('Usuario creado con éxito');
      this.router.navigate(['/login']);
    });

  }
}
