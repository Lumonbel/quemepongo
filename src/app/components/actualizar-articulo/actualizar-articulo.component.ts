import { Component, OnInit } from '@angular/core';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticuloDTO } from '../../models/articulo-dto';
import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-actualizar-articulo',
  imports: [BtAtrasComponent, ReactiveFormsModule],
  templateUrl: './actualizar-articulo.component.html',
  styleUrl: './actualizar-articulo.component.css'
})
export class ActualizarArticuloComponent implements OnInit {
  formulario!:FormGroup;
  articulo:   ArticuloDTO = {
    color: '',
    marca: '',
    material: '',
    temporada: '',
    imagen: '',
    estado: '',
    publicado: false,
    descripcion: '',
    tipo: '',
    genero: '',
    activo: true,
    talla: '',
    largo: '',
    grosor: '',
    capacidad: '',
    tipoAlmacenamiento: '',
    estampado: '',
  };

  constructor(private formBuilder: FormBuilder, private articuloService: ArticulosService ){ } 
  ngOnInit(): void{
    this.formulario = this.formBuilder.group({
      tipo: [this.articulo.tipo],
      color: [this.articulo.color],
      marca: [this.articulo.marca],
      material: [this.articulo.material],
      temporada: [this.articulo.temporada],
      imagen: [this.articulo.imagen],
      estado: [this.articulo.estado],
      publicado: [this.articulo.publicado],
      descripcion: [this.articulo.descripcion],
      genero: [this.articulo.genero],
      activo: [this.articulo.activo],
      talla: [this.articulo.talla],
      largo: [this.articulo.largo],
      grosor: [this.articulo.grosor],
      capacidad: [this.articulo.capacidad],
      tipoAlmacenamiento: [this.articulo.tipoAlmacenamiento],
      estampado: [this.articulo.estampado],
    })
  }

  cargarArticulo():void{
    this.articuloService.findById(1).subscribe((a) =>{
      this.articulo=a;
    });
  }
}