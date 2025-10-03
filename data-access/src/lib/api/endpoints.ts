export const ENDPOINTS = {
	auth: {
		health: (url: string) => `${url}/api/health`,
		login: (url: string) => `${url}/api/auth/login`,
		refresh: (url: string) => `${url}/api/auth/refresh`,
		logout: (url: string) => `${url}/api/auth/logout`,
	},
	permisos: {
		usuarios: (url: string) => `${url}/api/usuarios`
	},
	rutap: {
		entidades: (url: string) => `${url}/api/entidades`,
	},
}
