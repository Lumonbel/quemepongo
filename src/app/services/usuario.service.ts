import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../models/usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {  //Esto es como el Autowired del STS

  } 

  private apiUrlU = 'http://localhost:8888/api/usuarios';

   findAllU(): Observable<UsuarioDTO[]> {
      return this.http.get<UsuarioDTO[]>(this.apiUrlU);
    }
}
