import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioDTO } from '../../models/usuario-dto';
import { NgFor } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  constructor (private usuarioService: UsuarioService) {

  }


  usuarios: UsuarioDTO[] = [];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void{
    this.usuarioService.findAllU().subscribe((data) => {
      this.usuarios = data;
      console.log (data);
    })
  }


}
