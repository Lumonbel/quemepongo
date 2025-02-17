import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-password',
  imports: [BtAtrasComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './actualizar-password.component.html',
  styleUrl: './actualizar-password.component.css',
  standalone: true,
})
export class ActualizarPasswordComponent implements OnInit {

  formulario!: FormGroup;
  // usuario: any = null;
  usuario: any = {};
  mostrarDiv: string = '';
  nombreUsuario = localStorage.getItem('nombreUsuario');

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  //aqui puedo usar el find by nombre usuario
  // de inicio cliente vaya a 
  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    if (this.nombreUsuario == null) {
      this.router.navigate(['/index']);
    }
    console.log("Inicio del ver perfil cliente");
    /*
    this.usuarioService.findById(2).subscribe({
      next: (data) => {
        this.usuario = data;
        console.log("Mostramos el usuario" + this.usuario);
      },
      error: (error) => {
        console.error('Error al cargar el usuario' + error);
      },
    });
    */
    console.log("Final del if" + this.usuario);

    // Con esto  lo que hacemos es inincializar los datos que mñás tarde se van a mostrar en el formulario
    this.formulario = this.formBuilder.group({

      password: ['', Validators.required],

    });

    this.cargarUsuario();
  }
  /*
  cargarUsuario(): void {
    this.usuarioService.findById(1).subscribe({
      next: (data) => {
        this.usuario = data;
        console.log("Mostramos el usuario" + this.usuario);
        console.log("inicializamos el formulario");
        this.inicializarFormulario();
      },
      error: (error) => {
        console.error('Error al cargar el usuario' + error);
      },
    });
  }*/

  //Cargamos los datos del usuario


  cargarUsuario(): void {

    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {

      this.usuarioService.findByNombreUsuario(nombreUsuario).subscribe({
        next: (data) => {
          this.usuario = data;
          console.log("Mostramos el usuario:", this.usuario);

          if (this.formulario) {
            this.formulario.patchValue(this.usuario);
          }
        },
        error: (error) => {
          console.error('Error al cargar el usuario', error);
        },
      });

    }
  }


  inicializarFormulario(): void {
    if (this.usuario) {

      //Inicializamos los datos
      this.formulario = this.formBuilder.group({

        password: [this.usuario.password],


      });
      this.formulario.patchValue(this.usuario);
    } else {
      console.error('Error al importar el usuairo');
    }
  }

  imagenUrl = 'assets/images/image.png';
}
