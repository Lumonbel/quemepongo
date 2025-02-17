import { ArticuloDTO } from './../models/articulo-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion-dto';
import { UsuarioDTO } from '../models/usuario-dto';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  private apiUrl = 'http://localhost:8888/api/articulos';
  //
  //
  private apiUrlT = 'http://localhost:8888/api/transacciones';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  findAll(): Observable<ArticuloDTO[]> {
    return this.http.get<ArticuloDTO[]>(this.apiUrl);
  }



   findById(id: number): Observable<ArticuloDTO> {
    return this.http.get<ArticuloDTO>(`${this.apiUrl}/${id}`);
  }




  createArticulo(articulo: ArticuloDTO): Observable<ArticuloDTO> {
    return this.http.post<ArticuloDTO>(this.apiUrl, articulo );
  }

  updateArticulo(articulo: ArticuloDTO): Observable<ArticuloDTO> {
    console.log('URL:', this.apiUrl);
    console.log('Articulo:', articulo);
    return this.http.put<ArticuloDTO>(this.apiUrl, articulo);
  }
  /*
  updateArticulo( articulo: ArticuloDTO): Observable<ArticuloDTO> {
    return this.http.put<ArticuloDTO>(`${this.apiUrl}`, articulo);
  }
*/
  deleteArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findAllT(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.apiUrlT);
  }

  //PASO DE VARIABLES
  private artDeGaleria = new BehaviorSubject<ArticuloDTO>({} as ArticuloDTO); // Inicializa con un valor vacío
 art$= this.artDeGaleria.asObservable();


  pasoArticulo(articulo: ArticuloDTO) {
    this.artDeGaleria.next(articulo);
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/imagen`, { responseType: 'blob' });
  }
}
