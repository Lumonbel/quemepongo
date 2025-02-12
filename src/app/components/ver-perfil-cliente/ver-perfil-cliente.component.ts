import { Component, OnInit } from '@angular/core';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-perfil-cliente',
  imports: [BtAtrasComponent, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './ver-perfil-cliente.component.html',
  styleUrl: './ver-perfil-cliente.component.css'
})

export class VerPerfilClienteComponent implements OnInit {

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
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required],
      telefono: ['', Validators.required],
      imagen: ['', Validators.required],
      activo: ['', Validators.required],
      plan: ['', Validators.required],
      rol: ['', Validators.required]
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
        id: [this.usuario.id],
        nombre: [this.usuario.nombre],
        apellidos: [this.usuario.apellidos],
        email: [this.usuario.email],
        fechaNacimiento: [this.usuario.fechaNacimiento],
        nombreUsuario: [this.usuario.nombreUsuario],
        password: [this.usuario.password],
        telefono: [this.usuario.telefono],
        imagen: [this.usuario.imagen],
        plan: [this.usuario.plan],
        activo: [this.usuario.activo],
        rol: [this.usuario.rol]

      });
      this.formulario.patchValue(this.usuario);
    } else {
      console.error('Error al importar el usuairo');
    }
  }

  imagenUrl = 'assets/images/image.png';
}
