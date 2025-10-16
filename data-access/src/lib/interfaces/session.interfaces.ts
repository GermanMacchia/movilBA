import { Permiso } from './permisos.interfaces'

export interface Session {
	access_token: string
	iat: number
	exp: number
	usuario: UsuarioData
	permisos: Permiso[]
}

export interface UsuarioData {
	id: number
	nombre: string
}
