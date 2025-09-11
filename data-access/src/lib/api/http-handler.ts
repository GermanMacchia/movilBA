import { inject } from '@angular/core'
import { ENDPOINTS } from './endpoints'
import { HttpClient } from '@angular/common/http'
import { AppConfigService } from '../config'

export abstract class HttpHandler {
	protected endpoints = ENDPOINTS
	protected http = inject(HttpClient)
	protected config = inject(AppConfigService)

	getApiUrl = () => this.config.getConfigByKey('apiUrl')
}
