/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpBackend, HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'

const DEFAULT_CONFIG = {
	apiUrl: '/core',
	isQa: false,
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
	private config: any
	private httpBackend = inject(HttpBackend)

	public loadConfig() {
		return new Promise<void>((res, _rej) => {
			const http = new HttpClient(this.httpBackend)

			http.get('./assets/config.json').subscribe({
				next: (config: object) => {
					const urlVariable: { apiUrl: string; isQa: boolean } = JSON.parse(
						JSON.stringify(config),
					)
					this.config = { ...urlVariable }
					res()
				},
				error: () => {
					this.config = DEFAULT_CONFIG
					res()
				},
			})
		})
	}

	public getConfig() {
		return this.config
	}

	public getConfigByKey(key: string) {
		return this.config[key]
	}
}

export function initializeApp() {
	const appConfigService = inject(AppConfigService)
	return appConfigService.loadConfig()
}
