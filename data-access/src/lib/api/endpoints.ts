export const ENDPOINTS = {
	auth: {
		health: (url: string) => `${url}/api/health`,
		login: (url: string) => `${url}/api/auth/login`,
		logout: (url: string) => `${url}/api/auth/logout`,
	},
	entidades: {
		entidades: (url: string) => `${url}/api/entidades`,
	},
}
