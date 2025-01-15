import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloDTO } from '../models/articulo-dto';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  private apiUrl = 'http://localhost:8888/api/articulos';

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
}
