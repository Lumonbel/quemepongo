import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  private usuarioActual = new BehaviorSubject<any>(null);
  public usuario$ = this.usuarioActual.asObservable();

  constructor() { }

  iniciarSesion(usuario: any): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioActual.next(usuario);
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.usuarioActual.next(null);
  }

  obtenerUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioActual.next(JSON.parse(usuario));
    }
    return this.usuarioActual.value;
  }
}
