import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, timer } from 'rxjs';
import { Router } from '@angular/router';
import { TokenDTO } from '../models/token-dto';
import { AlertService } from '../services/alerts.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:8888/api/auth';
  private authToken = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService,
  ) { }

  login(nombreUsuario: string, password: string) {
    const body = JSON.stringify({ nombreUsuario, password });
    return this.http.post<TokenDTO>(this.apiUrl + `/login`, body, {
      headers: { "Content-Type": "application/json" },
    }).subscribe({
      next: (response) => {
        if (response && response.token) {
          console.log("Respuesta del servidor: ", response);
          localStorage.setItem('token', response.token);
          this.authToken.next(localStorage.getItem('token'));
          localStorage.setItem('nombreUsuario', nombreUsuario);
          this.router.navigate(['/perfilCliente']);
        } else {
          console.error("Estructura de respuesta inesperada: ", response);
          //Alerta usuario no existe
          this.alert.error("Usuario o contraseña incorrectos", "Error");
          
        }
      },error: (error) => {

        console.error("Error al intentar loguear: ", error);
        //Alerta usuario no existe
        this.alert.error("Usuario o contraseña incorrectos", "Error");
      }
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.authToken.next(null);
  }
  getAuthHeader() {
    return new HttpHeaders({
      Authorization: "Bearer " + this.getToken(),
    });
  }
}
