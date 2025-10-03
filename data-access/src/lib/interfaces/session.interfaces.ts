export interface Session {
	access_token: string
	iat: number
	exp: number
	usuario: Usuario
	permisos: Permisos[]
}

export interface Permisos {
	permisos: number
	modulo: Modulo
}


export interface Modulo {
	nombre: string
}


export interface Usuario {
	id: number
	nombre: string
}
