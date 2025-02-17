import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticulosService } from '../../services/articulos.service';
import { CommonModule } from '@angular/common';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { SweetAlertArrayOptions } from 'sweetalert2';
import { AlertService } from '../../services/alerts.service';
//import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-act-art-p2',
  standalone: true,
  imports: [FormsModule, CommonModule, BtAtrasComponent],
  templateUrl: './act-art-p2.component.html',
  styleUrl: './act-art-p2.component.css',
  providers: [

  ]
})
export class ActArtP2Component implements OnInit {
  previewImage: string  | null = null;
  imagenSeleccionada: File | null = null;
  articulo: any = {
    id: '',
    color: '',
    marca: '',
    material: '',
    temporada: '',
    imagen: '',
    estado: '',
    publicado: '',
    descripcion: '',
    tipo: '',
    genero: '',
    activo: '',
    talla: '',
    largo: '',
    grosor: '',
    capacidad: '',
    tipoAlmacenamiento: '',
    estampado: '',
    precio: '',
    usuario: '',

  };
  categorias = [
    {
      nombre: 'Complementos',
      subcategorias: ['Bolso', 'Bufanda', 'Cinturón', 'Corbata', 'Gorro', 'Guantes']
    },
    {
      nombre: 'Ropa',
      subcategorias: ['Camisa', 'Chaqueta', 'Falda', 'Jersey', 'Pantalon', 'Ropa de baño', 'Sudadera', 'Vestido']
    },
    {
      nombre: 'Zapatos',
      subcategorias: []
    }
  ];
  constructor(
    private articuloService: ArticulosService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private alerta: AlertService,
  ) { }

  categoriaSeleccionada: string = '';
  subcategoriaSeleccionada: string = '';
  subcategoriasFiltradas: string[] = [];


  ngOnInit() {
    this.articuloService.findById(1).subscribe({
      next: (data) => {
        this.articulo = data;
        console.log(this.articulo);
        // Datos recibidos de la base de datos
        this.subcategoriaSeleccionada = this.articulo.tipo;
        if (this.articulo?.imagen) {
          this.previewImage = 'data:image/png;base64,' + this.articulo.imagen;
          // Asignar imagen en el objeto artículo
          this.articulo.imagen = this.previewImage;
        }



        // Encontrar y establecer la categoría correspondiente
        for (let categoria of this.categorias) {
          if (categoria.subcategorias.includes(this.subcategoriaSeleccionada)) {
            this.categoriaSeleccionada = categoria.nombre;
            break;
          }
        }

        // Cargar subcategorías correspondientes
        this.actualizarSubcategorias();
      },
      error: (err) => {
        console.error('Error al cargar el artículo:', err);
      },
    });
    console.log(this.articulo);

  }

  actualizarSubcategorias() {
    const categoria = this.categorias.find(cat => cat.nombre === this.categoriaSeleccionada);
    this.subcategoriasFiltradas = categoria ? categoria.subcategorias : [];
  }

  actualizarCategoria() {
    console.log('Actualizando producto:', this.articulo);
    this.articulo.tipo = this.subcategoriaSeleccionada;
    // Eliminar el prefijo "data:image/png;base64,"
    if(this.previewImage){
      const base64Data = this.previewImage.split(',')[1];

    // Ahora puedes enviar base64Data al backend
    this.articulo.imagen = base64Data;
    }
    
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      this.usuarioService.findByNombreUsuario(nombreUsuario).subscribe({
        next: (data) => {
          this.articulo.usuario = data;
          console.log('Usuario encontrado:', data);
          this.articuloService.updateArticulo(this.articulo).subscribe({
            next: (response) => {
              console.log('Producto actualizado:', response);
              this.alerta.success("Actualización correcta", "Su actualización se ha realizado correctamente")
            },
            error: (err) => {
              console.error('Error al actualizar:', err);
            },
          });
        },
        error: (err) => {
          console.error('Error al cargar el usuario:', err);
        },
      });
    } else {
      console.error('No se encontró el nombre de usuario en el localStorage');
    }
  }

  previsualizarImagen(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      this.imagenSeleccionada = file;
      // Se ejecuta cuando el lector termina de cargar el archivo
      reader.onload = () => {
        //this.previewImage = reader.result;
        this.previewImage = reader.result as string;
        this.articulo.imagen = this.previewImage;
      };

      // Leemos el archivo como Data URL (base64)
      reader.readAsDataURL(file);
      /*
      this.formulario.patchValue({ foto: file });
      this.imagenSeleccionada = file;
      const objectUrl = URL.createObjectURL(file);
      this.imagenPreview = this.sanitizer.bypassSecurityTrustUrl(objectUrl);*/

    }
  }
}
