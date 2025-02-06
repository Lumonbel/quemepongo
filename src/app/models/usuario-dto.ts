export interface UsuarioDTO {

	id?:number;//Esta vacio por el tema de crear usuario

	nombre: string;
	apellidos: string;
	email: string;
	fechaNacimiento: Date;
	nombreUsuario: string;
	password: string;
	telefono:string;
	imagen:string;
	activo:boolean;
	plan:string;
	rol:string;
}
