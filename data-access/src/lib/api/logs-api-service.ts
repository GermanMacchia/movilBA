import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LogsResponse } from '../interfaces/logs.interfaces'
import { HttpHandler } from './http-handler'

@Injectable({ providedIn: 'root' })
export class LogsApiService extends HttpHandler {
	getLogs = (limit: number = 50, offset: number = 0): Observable<LogsResponse> =>
		this.http.get<LogsResponse>(
			`${this.endpoints.logs.logs(this.getApi(this.api))}?limit=${limit}&offset=${offset}`,
		)
}
