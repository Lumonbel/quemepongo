import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloDTO } from '../models/articulo-dto';
import { Transaccion } from '../models/transaccion-dto';
import { UsuarioDTO } from '../models/usuario-dto';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  private apiUrl = 'http://localhost:8888/api/articulos';
  private apiUrlT = 'http://localhost:8888/api/transacciones';
  private apiUrlU = 'http://localhost:8888/api/usuarios';


  constructor(private http: HttpClient) {}

  findAll(): Observable<ArticuloDTO[]> {
    return this.http.get<ArticuloDTO[]>(this.apiUrl);
  }

  createArticulo(articulo: ArticuloDTO): Observable<ArticuloDTO> {
    return this.http.post<ArticuloDTO>(this.apiUrl, articulo);
  }

  updateArticulo(id: number, articulo: ArticuloDTO): Observable<ArticuloDTO> {
    return this.http.put<ArticuloDTO>(`${this.apiUrl}/${id}`, articulo);
  }

  deleteArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findAllT(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.apiUrlT);
  }

   findAllU(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.apiUrlU);
  }
}
