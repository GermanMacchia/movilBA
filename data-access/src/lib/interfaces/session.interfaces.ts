export interface Session {
	access_token: string
	iat: number
	exp: number
	usuario: Usuario
	permisos: Permisos[]
}

export interface Permisos {
	permisos: number
	modulo: Usuario
}

export interface Usuario {
	id: number
	nombre: string
}
