export interface ArticuloDTO {
  id?: number; // Opcional porque podría no estar presente al crear un nuevo artículo
  color: string;
  marca: string;
  material: string;
  temporada: string;
  imagen: string;
  estado: string;
  publicado: boolean;
  descripcion: string;
  tipo: string;
  genero?: string;
  activo: boolean;
  talla?: string;
  largo?: string;
  grosor?: string;
  capacidad?: string;
  tipoAlmacenamiento?: string;
  estampado?: string;
  precio?: number;
}
