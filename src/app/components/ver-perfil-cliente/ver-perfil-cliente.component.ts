import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-ver-perfil-cliente',
  imports: [HeaderComponent, FooterComponent, BtAtrasComponent],
  templateUrl: './ver-perfil-cliente.component.html',
  styleUrl: './ver-perfil-cliente.component.css'
})

export class VerPerfilClienteComponent implements OnInit {

  formulario!: FormGroup;
  usuario: any = null;
  mostrarDiv: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

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
