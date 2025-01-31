import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { SesionService } from '../../services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FooterComponent, CommonModule, HeaderComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  password: string = '';
  nombre: string = '';
	apellidos: string = '';
	email: string = '';
	fechaNacimiento: Date = new Date();
	nombreUsuario: string = '';
	telefono:string = '';
	imagen:string = '';
	activo:boolean = true;
	plan:string = '';
	rol:string = '';

  constructor(
    private usuarioService : UsuarioService,
    private SesionService : SesionService,
    private router: Router,
  ) {}

  logIn() {
    console.log('LogIn');
    const usuario = { nombreUsuario: this.nombreUsuario, password: this.password, nombre: this.nombre, apellidos: this.apellidos, email: this.email, fechaNacimiento: this.fechaNacimiento, telefono: this.telefono, imagen: this.imagen, activo: this.activo, plan: this.plan, rol: this.rol };
    console.log(usuario);
    this.usuarioService.login(usuario).subscribe((datos) => {
      if (datos >= 0) {
        console.log('Usuario loggeado');
        this.SesionService.iniciarSesion(datos);
        this.router.navigate(['/perfilCliente']);
      } else{
        console.log('Usuario no loggeado');
        this.router.navigate(['/login']);
      }
      console.log(datos);
    });
  }
}