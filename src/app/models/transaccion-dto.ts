// transaccion.interface.ts
export interface Transaccion {
  id?: number;
  estado: string;
  gastosEnvio: number;
  envio: Direccion;

}


export interface Direccion {
  id: number;
  via: string;
  nombre: string;
  numero: string;
  puerta: string;
  codigoPostal: string;
  provincia: string;
  activo: boolean;
  ciudad: string;
  nombrePuntoRecogida: string;
  telefonoPuntoRecogida: string;
  horariosPuntoRecogida: string;
  personaContactoPuntoRecogida: string;
}
