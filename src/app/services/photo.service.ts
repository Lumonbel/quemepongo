import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArticulosService } from './articulos.service';
import { ArticuloDTO } from '../models/articulo-dto';

@Injectable()
export class PhotoService {
  private apiUrl = 'http://localhost:8888/api/articulos';
  articulos: ArticuloDTO[] = [];

  constructor(
    private articulosService: ArticulosService,
    private http: HttpClient
  ) {
    this.articulosService.findAll().subscribe((articulos) => {
      // Procesamos las imágenes antes de asignarlas
      this.articulos = this.processImages(articulos);
    });
  }


  /**
   * Asegura que una imagen Base64 tenga el prefijo correcto.
   * @param imageString - La imagen en formato Base64.
   * @param format - El formato de la imagen (por defecto 'png').
   * @returns Imagen con el prefijo adecuado.
   */
  convertToBase64(imageString: string, format: string = 'png'): string {
    if (!imageString.startsWith('data:image/')) {
      return `data:image/${format};base64,${imageString}`;
    }
    return imageString;
  }

  /**
   * Convierte una cadena binaria en un objeto URL para mostrarla en un `<img>`.
   * @param binaryData - Cadena binaria de la imagen.
   * @returns URL del objeto Blob.
   */
  private convertBinaryToUrl(binaryData: string): string {
    const byteCharacters = atob(binaryData);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    return URL.createObjectURL(blob);
  }

  /**
   * Procesa las imágenes de los artículos para asegurarse de que tengan el formato correcto.
   * @param articulos - Lista de artículos.
   * @returns Lista de artículos con imágenes en formato adecuado.
   */
  private processImages(articulos: ArticuloDTO[]): ArticuloDTO[] {
    return articulos.map((articulo) => {
      if (articulo.imagen) {
        // Si la imagen es Base64, la aseguramos con el prefijo correcto
        articulo.imagen = this.convertToBase64(articulo.imagen);
      }
      return articulo;
    });
  }

  /**
   * Devuelve los artículos con las imágenes ya procesadas.
   * @param articulosMostrar - Lista de artículos a mostrar.
   * @returns Observable con los artículos modificados.
   */
  getData(articulosMostrar: ArticuloDTO[]): Observable<ArticuloDTO[]> {
    return from(Promise.resolve(this.processImages(articulosMostrar)));
  }

  // In photo.service.ts
  public convertImageToBase64(
    imageString: string,
    format: string = 'png'
  ): string {
    return this.convertToBase64(imageString, format);
  }
}
