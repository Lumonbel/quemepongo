import { Component, OnInit } from '@angular/core';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SesionService } from '../../services/sesion.service';
import { AlertService } from '../../services/alerts.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-ver-perfil-cliente',
  imports: [BtAtrasComponent, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './ver-perfil-cliente.component.html',
  styleUrl: './ver-perfil-cliente.component.css'
})

export class VerPerfilClienteComponent implements OnInit {

  previewImage: string | null = null;

  imagenSeleccionada: File | null = null;

  usuario: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder,
    private photoService: PhotoService,
    private sanitizer: DomSanitizer,
  ) {

    const nombreUsuario = localStorage.getItem('nombreUsuario');
    this.nombreUsuario = nombreUsuario;
    console.log("Nombre de usuario: ", this.nombreUsuario);
    //this.usuario = this.sesionService.obtenerUsuario().nombre;
  }

  formulario!: FormGroup;
  // usuario: any = null;
  mostrarDiv: string = '';
  nombreUsuario = localStorage.getItem('nombreUsuario');

  //aqui puedo usar el find by nombre usuario
  // de inicio cliente vaya a 
  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    if (this.nombreUsuario == null) {
      this.router.navigate(['/index']);
    }
    console.log("Inicio del ver peewferfrrfil cliente", this.usuario);
    // Cosas de la imagen
    

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
          
          if (this.usuario?.imagen) {
            // this.previewImage =  this.usuario?.imagen;
            // this.usuario.imagen = this.previewImage;


            this.previewImage = this.photoService.convertToBase64(this.usuario?.imagen);
            console.log('Imagen:', this.previewImage);
          }
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


  actualizarUsuario(): void {
    console.log('Actualizando usuario:', this.usuario);
    this.alertService.confirm(
      'Confirmar cambios',
      `¿Estás seguro de que quieres actualizar el usuario?`,
      'Sí, actualizar',
      'Descartar cambios'
    ).then((confirmed) => {
      if (confirmed) {
        const nombreUsuario = localStorage.getItem('nombreUsuario');
        if (nombreUsuario) {
          if (this.previewImage) {
            const base64Data = this.previewImage.split(',')[1];
            this.usuario.imagen = base64Data;
          }
          
          this.usuarioService.updateUsuario(this.usuario).subscribe({
            next: (response) => {
              console.log('Usuario actualizado:', response);
            },
            error: (error) => {
              console.error('Error al actualizar el usuario', error);
            },
          });
        } else {
          console.error('Error al encontrar el nombre de usuario en el localStorage');
        }
      }
    }); // <- Se cerró correctamente el `.then()`

    /*
    actualizarUsuario(): void {
    this.alertService.confirm(
      'Confirmar cambios',
      `¿Estás seguro de que quieres actualizar el usuario?`,
      'Sí, actualizar',
      'Descartar cambios'
    ).then((confirmed) => {
      if (confirmed) {
        console.log('Actualizando usuario:', this.usuario);
        this.usuarioService.findByNombreUsuario('nombreUsuario').subscribe({
          next: (data) => {
            this.usuario = data;
            console.log("Hemos encontrado el usuario", data);
            //this.usuarioService.
          },
          error: (error) => {
            console.error('Error al cargar el usuario', error);
          },
        });
    
      }
    });
    console.log('Actualizando usuario:', this.usuario);
    this.usuario.tipo = 
    
    }
    */

    /*
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
    */
  }
  previsualizarImagen(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      this.imagenSeleccionada = file;
      // Se ejecuta cuando el lector termina de cargar el archivo
      reader.onload = () => {
        this.previewImage = reader.result as string;
        this.usuario.imagen = this.previewImage;
      };

      // Leemos el archivo como Data URL (base64)
      reader.readAsDataURL(file);

    }
  }
}