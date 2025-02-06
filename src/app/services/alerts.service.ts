import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

/**
 * Servicio para mostrar alertas y mensajes de confirmación
 * usando la librería SweetAlert2.
 */

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  /**
   * Muestra un mensaje de éxito con ícono 'success'.
   * @param title Título de la alerta
   * @param text Texto descriptivo de la alerta
   */
  success(title: string, text: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      confirmButtonText: 'Aceptar',
    });
  }

  /**
   * Muestra un mensaje de error con ícono 'error'.
   * @param title Título de la alerta
   * @param text Texto descriptivo del error
   */
  error(title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      confirmButtonText: 'Aceptar',
    });
  }

  /**
   * Muestra un mensaje de confirmación con opciones de Sí/No.
   * @param title Título de la alerta
   * @param text Texto descriptivo
   * @param confirmButtonText Texto del botón de confirmación
   * @param cancelButtonText Texto del botón de cancelación
   * @returns Promise<boolean> indicando si el usuario confirmó (true) o canceló (false)
   */
  confirm(
    title: string,
    text: string,
    confirmButtonText: string = 'Sí',
    cancelButtonText: string = 'Cancelar'
  ): Promise<boolean> {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }).then((result) => result.isConfirmed);
  }

  /**
   * Muestra un mensaje de información con ícono 'info'.
   * @param title Título de la alerta
   * @param text Texto descriptivo
   */
  info(title: string, text: string): void {
    Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      confirmButtonText: 'Aceptar',
    });
  }
}

/*
1. Instalación del paquete principal de SweetAlert2
Primero, en la raíz de tu proyecto Angular, ejecuta:
npm install sweetalert2
Este comando descargará e instalará la librería base de SweetAlert2.

2. Uso Directo de SweetAlert2
Podemos importar SweetAlert2 directamente en tus componentes o servicios TypeScript y utilizar la API de Swal.fire() de forma manual.

Por ejemplo, en tu componente:
import Swal from 'sweetalert2';

export class MiComponente {
  mostrarAlerta() {
    Swal.fire('Hello world!');
  }
}*/
