import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../models/usuario-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private http: HttpClient,
    private authService: AuthService,
  ) {
    //Esto es como el Autowired del STS

  }

  private apiUrlU = 'http://localhost:8888/api/usuarios';


  findAllU(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.apiUrlU);
  }

  login (usuario : UsuarioDTO) : Observable<number> {
    return this.http.post<number>(`${this.apiUrlU}/login`, usuario);
  }

  findByNombreUsuario(nombreUsuario: string): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrlU}/search/${nombreUsuario}`);

  }

  //Hacemos el método para buscar por id el usuario que necesitemso
  findById(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrlU}/${id}`);
  }

  usuarioLoggeado(id: number) {

  }

  anyadirUsuario(usuario:UsuarioDTO) {
    return this.http.post<UsuarioDTO>(`${this.apiUrlU}/add`,usuario)
  }
}
