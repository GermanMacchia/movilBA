export interface Usuario {
	nombre: string
	rol: string
}

export interface Auth {
	usuario: Usuario
}

export interface Session {
	success: boolean
	authenticated: boolean
	user: User
	session: SessionClass
}

export interface SessionClass {
	expires: Date
}

export interface User {
	id: string
	email: string
	name: string
}

export type LoginInfo = {
	label: string
	formControlName: string
	placeholder: string
}

export type LoginData = { input: LoginInfo; password: LoginInfo }

export interface ModulosRoutes {
	label: string
	routerLink: string
	color: string
	icon: string
	only: string
}
