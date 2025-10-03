import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import { AppConfigService } from '../config'
import { ENDPOINTS } from './endpoints'

export abstract class HttpHandler {
	protected endpoints = ENDPOINTS
	protected http = inject(HttpClient)
	protected config = inject(AppConfigService)
	protected api = 'apiUrl'
	getApi = (name: string) => this.config.getConfigByKey(name)
}
