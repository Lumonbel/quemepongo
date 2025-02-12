import { ArticulosService } from './articulos.service';
import { Injectable } from '@angular/core';
import { ArticuloDTO } from '../models/articulo-dto';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotoService {
  private apiUrl = 'http://localhost:8888/api/articulos';

  constructor(private articulosService: ArticulosService, private http: HttpClient,) {
    this.articulosService.findAll().subscribe((articulos) => {
      this.articulos = articulos;
    });
  }

  articulos: ArticuloDTO[] = [];
  getData(articulosMostrar: ArticuloDTO[]): Observable<ArticuloDTO[]> {
    // Creamos un arreglo de promesas para cargar las imágenes de cada artículo
    const articuloPromises = articulosMostrar.map(articulo => {
      if (articulo.id !== undefined) {
        return this.getImage(articulo.id).toPromise().then(imageBlob => {
          const reader = new FileReader();
          
          return new Promise<ArticuloDTO>((resolve, reject) => {
            reader.onload = () => {
              articulo.imagen = reader.result as string;  // Almacenamos la imagen convertida en base64
              resolve(articulo);
            };
            reader.onerror = (error) => {
              console.error('Error al leer el Blob', error);
              reject(error);  // Manejo de errores
            };
            reader.readAsDataURL(imageBlob);  // Convertimos el Blob en base64
          });
        }).catch(error => {
          console.error('Error al obtener la imagen', error);
          return articulo;  // En caso de error, retornamos el artículo sin imagen
        });
      }
      return Promise.resolve(articulo);  // Si el artículo no tiene id, retornamos el artículo sin cambios
    });
  
    // Devolvemos un Observable que se resuelve cuando todas las promesas se resuelven
    return from(Promise.all(articuloPromises));  // `from` convierte la promesa en un Observable
  }
  
  getImage(id: number): Observable<Blob> {
    // Solicita la imagen del backend como un Blob
    return this.http.get(`${this.apiUrl}/${id}/imagen`, { responseType: 'blob' });
  }
  
}


