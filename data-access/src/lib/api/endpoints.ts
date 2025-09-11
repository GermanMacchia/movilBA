export const ENDPOINTS = {
	auth: {
		health: (url:string) => `${url}/api/health`,
		// persmissions: (url:string) => `${url}/api/navigation` ,
		cfrToken: (url: string) => `${url}/api/auth/client/csrf`,
		login: (url: string) => `${url}/api/auth/client/login`,
		logout: (url:string) => `${url}/api/auth/client/logout`,
		session: (url: string) => `${url}/api/auth/client/session`,
	},
}
