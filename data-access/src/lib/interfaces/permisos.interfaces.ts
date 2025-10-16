export interface Usuario {
	id: number
	cuil: string
	nombre: string
	email: string
	ultimo_login: Date
	deletedAt: null
	permisos: Permiso[]
}

export interface Permiso {
	permisos: string
	modulo: Modulo
}

export interface Modulo {
	id: number
	nombre: string
}
