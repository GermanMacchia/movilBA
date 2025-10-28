export const ENDPOINTS = {
	auth: {
		health: (url: string) => `${url}/api/health`,
		login: (url: string) => `${url}/api/auth/login`,
		refresh: (url: string) => `${url}/api/auth/refresh`,
		logout: (url: string) => `${url}/api/auth/logout`,
	},
	permisos: {
		usuarios: (url: string) => `${url}/api/usuarios`,
		restore: (url: string) => `${url}/api/usuarios/restore`,
		modulos: (url: string) => `${url}/api/modulos`,
		permisos: (url: string) => `${url}/api/permisos`,
	},
	rutap: {
		entidades: (url: string) => `${url}/api/entidades`,
		vehiculos: (url: string, entidad_id: number) =>
			`${url}/api/entidades/vehiculos/${entidad_id}`,
		lineas: (url: string, entidad_id: number) =>
			`${url}/api/entidades/lineas/${entidad_id}`,
	},
	logs: {
		logs: (url: string) => `${url}/api/logs`,
	},
}
