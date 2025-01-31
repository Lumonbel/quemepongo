import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';

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
	nombreusuario: string = '';
	telefono:string = '';
	imagen:string = '';
	activo:boolean = true;
	plan:string = '';
	rol:string = '';

  constructor(public usuarioService : UsuarioService) {}

  logIn() {
    const usuario = { nombreusuario: this.nombreusuario, password: this.password, nombre: this.nombre, apellidos: this.apellidos, email: this.email, fechaNacimiento: this.fechaNacimiento, telefono: this.telefono, imagen: this.imagen, activo: this.activo, plan: this.plan, rol: this.rol };
    this.usuarioService.login(usuario).subscribe((datos) => {
      console.log(datos);
    });
  }

}